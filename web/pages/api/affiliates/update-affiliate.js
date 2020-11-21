import { PrismaClient } from '@prisma/client';
import { authenticated } from '../../../services/authenticated';

const prisma = new PrismaClient();

export default authenticated(async function (req, res) {
  if (req.method !== 'PUT') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }
  const {
    id,
    store,
    affiliateLink
  } = await req.body;

  await prisma.affiliateLink.update({
    where: {
      id: Number(id)
    },
    data: {
      store,
      affiliateLink
    }
  });

  res.statusCode = 201;
  res.json({ message: 'Link de afiliados atualizado com sucesso!' });
  return res
});
