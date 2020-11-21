import { PrismaClient } from '@prisma/client';
import { authenticated } from '../../../services/authenticated';

const prisma = new PrismaClient();

export default authenticated (async function (req, res) {
  if (req.method !== 'DELETE') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }
  const { id } = req.query;

  await prisma.affiliateLink.delete({
    where: {
      id: Number(id)
    }
  });

  res.statusCode = 200;
  res.json({
    message: `O link foi deletado.`
  });
  return res
})
