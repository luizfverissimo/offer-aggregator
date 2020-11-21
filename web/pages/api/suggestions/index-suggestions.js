import { PrismaClient } from '@prisma/client';
import { authenticated } from '../../../services/authenticated';

const prisma = new PrismaClient();

export default authenticated(async function (req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return res;
  }

  const { cursor, rows } = req.query;

  if (!cursor) {
    const offers = await prisma.offerSuggestion.findMany({
      take: Number(rows),
      orderBy: { id: 'desc' }
    });
    res.statusCode = 200;
    res.json(offers);
    return res;
  }

  if(cursor) {
    
    const offers = await prisma.offerSuggestion.findMany({
      take: Number(rows),
      skip: 1,
      cursor: {
        id: Number(cursor)
      },
      orderBy: { id: 'desc' }
    });

    res.statusCode = 200;
  res.json(offers);
  return res;
  }
});
