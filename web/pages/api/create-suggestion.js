import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 500;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }
  const { offerLink } = await req.body;

  const createdAt = moment().format('YYYY/MM/DD HH:mm');

  await prisma.offerSuggestion.create({
    data: {
      offerLink,
      createdAt
    }
  });

  res.statusCode = 201;
  res.json({ message: 'Sugestão de Oferta criada com sucesso!' });
}
