import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const indexOffers = async (req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }
  const offers = await prisma.offer.findMany({
    include: {
      author: {
        select: {
          name: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.statusCode = 200;
  res.json(offers);
  return
}

export default indexOffers