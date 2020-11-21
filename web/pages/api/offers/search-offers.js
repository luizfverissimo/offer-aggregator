import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const searchOffers = async (req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }

  const { search } = req.query;

  const offers = await prisma.offer.findMany({
    where: {
      name: {
        contains: search,
      }
    },
    include: {
      author: {
        select: {
          name: true
        }
      },
      affiliate: {
        select: {
          id: true,
          store: true,
          affiliateLink: true
        }
      },
    },
    orderBy: { createdAt: 'desc' }
  });

  res.statusCode = 200;
  res.json(offers);
  return
}

export default searchOffers