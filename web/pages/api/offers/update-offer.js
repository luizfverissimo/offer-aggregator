import { PrismaClient } from '@prisma/client';
import { authenticated } from '../../../services/authenticated';
import moment from 'moment';

const prisma = new PrismaClient();

export default authenticated(async function (req, res) {
  if (req.method !== 'PUT') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return;
  }
  const {
    id,
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

  const createdAt = moment().format('YYYY/MM/DD HH:mm');

  await prisma.offer.update({
    where: {
      id: Number(id)
    },
    data: {
      name,
      urlImage,
      urlOffer,
      description,
      offerPrice,
      normalPrice,
      coupon,
      affiliate: {
        connect: { id: affiliate }
      },
      store,
      createdAt,
      offerText,
      author: {
        connect: { id: author }
      }
    }
  });

  res.statusCode = 201;
  res.json({ message: 'Oferta atualizada com sucesso!' });
  return res
});
