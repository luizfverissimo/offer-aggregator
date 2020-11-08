import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 500
    res.json({ error: `This endpoint do not receive ${req.method} request`})
    return
  }
  const offers = await prisma.offerSuggestion.findMany({
    orderBy: { createdAt: 'desc' }
  });

  res.statusCode = 200;
  res.json(offers);
}
