import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method !== 'DELETE') {
    res.statusCode = 500;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }
  const { id } = req.query;

  const offerUpdated = await prisma.offerSuggestion.delete({
    where: {
      id: Number(id)
    },
  });

  res.statusCode = 200;
  res.json({
    message: `A sugestão foi deletada.`
  });
}
