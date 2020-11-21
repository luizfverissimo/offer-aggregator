import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const indexOffers = async (req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }

  const { cursor, rows } = req.query;

  if (!cursor) {
    const offers = await prisma.offer.findMany({
      take: Number(rows),
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
        }
      },
      orderBy: { id: 'desc' }
    });

    res.statusCode = 200;
    res.json(offers);
    return;
  }

  if (cursor) {
    const offers = await prisma.offer.findMany({
      take: Number(rows),
      skip: 1,
      cursor: {
        id: Number(cursor)
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
        }
      },
      orderBy: { id: 'desc' }
    });

    res.statusCode = 200;
    res.json(offers);
    return;
  }
};

export default indexOffers;
