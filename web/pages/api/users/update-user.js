import { PrismaClient } from '@prisma/client';
import { authenticated } from '../../../services/authenticated';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export default authenticated(async function (req, res) {
  if (req.method !== 'PUT') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }
  const { email, password, newPassword, role } = await req.body;

  const payload = jwt.decode(req.headers.authorization)

  const user = await prisma.user.findOne({
    where: {
      email: email
    }
  });

  if (!user) {
    res.statusCode = 401;
    res.json({ message: 'Dados incorretos.' });
    return;
  }

  if (newPassword.length !== 0) {
    if (payload.role !== 'ADMIN') {
      try {
        const granted = await bcrypt.compare(password, user.password);

        if (!granted) {
          res.statusCode = 401;
          res.json({ message: 'Dados incorretos.' });
          return res;
        }
      } catch (err) {
        console.log(err);
        res.statusCode = 401;
        res.json({ message: 'Dados incorretos.' });
        return res;
      }
    }

    bcrypt.hash(newPassword, 10, async function (err, hash) {
      // Store hash in your password DB.
      await prisma.user.update({
        where: {
          email: email
        },
        data: {
          password: hash,
          role
        }
      });

      console.log(err);
    });
  } else {
    await prisma.user.update({
      where: {
        email: email
      },
      data: {
        role
      }
    });
  }

  res.statusCode = 201;
  res.json({ message: 'Senha alterada com sucesso' });
  return res;
});
