import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method !== 'PUT') {
    res.statusCode = 500;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }
  const { id } = req.query;
  const offer = await prisma.offer.findOne({
    where: { id: Number(id) }
  });

  const offerUpdated = await prisma.offer.update({
    where: {
      id: Number(id)
    },
    data: {
      active: !offer.active
    }
  });

  res.statusCode = 200;
  res.json({
    message: `A oferta ${offerUpdated.name} foi ${
      offerUpdated.active ? 'ativada' : ' desativada'
    }.`
  });
}
