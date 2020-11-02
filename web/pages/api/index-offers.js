import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res) {
    const offers = await prisma.offer.findMany();

    console.log(offers);

    res.statusCode = 200;
    res.json(offers);
}