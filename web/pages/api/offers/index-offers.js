import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const indexOffers = async (req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }

  const { cursor } = req.query
  const paginationRowsNumber = 5


  if(!cursor) {
    const offers = await prisma.offer.findMany({
      take: paginationRowsNumber,
      include: {
        author: {
          select: {
            name: true
          }
        }
      },
      orderBy: { id: 'desc' }
    });

    res.statusCode = 200;
    res.json(offers);
    return
  }

  if (cursor) {
    const offers = await prisma.offer.findMany({
      take: paginationRowsNumber,
      skip: 1,
      cursor: {
        id: Number(cursor)
      },
      include: {
        author: {
          select: {
            name: true
          }
        }
      },
      orderBy: { id: 'desc' }
    });

    res.statusCode = 200;
    res.json(offers);
    return
  }
}

export default indexOffers