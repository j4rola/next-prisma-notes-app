import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); 

export default async function handler(req, res) {
  console.log(req.body.id)
  const matching = await prisma.tab.delete({
    where: {
        id: req.body.id,
    }
  })
  console.log(matching)
  res.status(200).json({ message: 'deleted' })
}