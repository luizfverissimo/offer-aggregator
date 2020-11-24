import { PrismaClient } from '@prisma/client';
import { authenticated } from '../../../services/authenticated';

const prisma = new PrismaClient();

export default authenticated(async function (req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.json({ error: `This endpoint do not receive ${req.method} request` });
    return res;
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      password: false
    },
    orderBy: { id: 'asc' }
  });
  res.statusCode = 200;
  res.json(users);
  return res;
});
