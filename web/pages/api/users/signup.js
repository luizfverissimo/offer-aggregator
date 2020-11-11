import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }
  const { name, email, password } = await req.body;

  const userAlreadyCreated = await prisma.user.findOne({
    where: {
      email: email
    }
  });

  if (userAlreadyCreated) {
    res.statusCode = 400;
    res.json({ message: 'Usuário já existe em nossa base de dados.' });
    return;
  }

  if (name.length === 0) {
    res.statusCode = 411;
    res.json({ message: 'O campo nome não pode estar em branco.' });
    return;
  }

  if (password.length < 8) {
    res.statusCode = 411;
    res.json({ message: 'A senha deve ter no mínimo 8 caracteres.' });
    return;
  }

  bcrypt.hash(password, 10, async function (err, hash) {
    // Store hash in your password DB.
    await prisma.user.create({
      data: {
        name,
        email,
        password: hash
      }
    });

    res.statusCode = 201;
    res.json({ message: 'Usuário criado com sucesso!' });
    return;
  });
}
