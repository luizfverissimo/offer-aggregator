import { PrismaClient } from '@prisma/client';
import { authenticated } from '../../../services/authenticated';
import moment from 'moment';

const prisma = new PrismaClient();

export default authenticated(async function (req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }
  const {
    name,
    urlImage,
    urlOffer,
    description,
    offerPrice,
    normalPrice,
    coupon,
    affiliate,
    store,
    offerText,
    author
  } = await req.body;

  const active = true;
  const createdAt = moment().format('YYYY/MM/DD HH:mm');
  if (!affiliate) {
    affiliate = 'SEM'
  }

  await prisma.offer.create({
    data: {
      active,
      name,
      urlImage,
      urlOffer,
      description,
      offerPrice,
      normalPrice,
      coupon,
      affiliate,
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
});
