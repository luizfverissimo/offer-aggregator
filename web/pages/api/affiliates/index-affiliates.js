import { PrismaClient } from '@prisma/client';
import { authenticated } from '../../../services/authenticated';

const prisma = new PrismaClient();

export default authenticated(async function (req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return res;
  }

  const offers = await prisma.affiliateLink.findMany({
    orderBy: { id: 'desc' }
  });
  res.statusCode = 200;
  res.json(offers);
  return res;
});
