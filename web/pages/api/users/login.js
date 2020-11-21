import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }
  const { email, password } = await req.body;

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

  const granted = await bcrypt.compare(password, user.password);

  if (!granted) {
    res.statusCode = 401;
    res.json({ message: 'Dados incorretos.' });
    return;
  }

  const information = { id: user.id, name: user.name, role: user.role };

  const authToken = await jwt.sign(information, process.env.JWT_SECRET, {
    expiresIn: '1day'
  });

  res.statusCode = 201;
  res.json({
    message: 'Acesso concedido!',
    authToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
  return;
}
