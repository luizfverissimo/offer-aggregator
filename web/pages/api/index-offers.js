import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res) {
  const offers = await prisma.offer.findMany({
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
}
