import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

export default async function (req, res) {
  const {
    name,
    urlImage,
    urlOffer,
    description,
    offerPrice,
    normalPrice,
    store,
    offerText,
    author
  } = await req.body;

  const active = true;
  const createdAt = moment().format('YYYY/MM/DD HH:mm');

  await prisma.offer.create({
    data: {
      active,
      name,
      urlImage,
      urlOffer,
      description,
      offerPrice,
      normalPrice,
      store,
      createdAt,
      offerText,
      author: {
        connect: { id: author }
      }
    }
  });

  res.statusCode = 201;
  res.json({ message: 'Oferta criada com sucesso!' });
}
