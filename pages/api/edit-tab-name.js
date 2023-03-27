import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); 

export default async function handler(req, res) { 
  console.log(req.body.id)
  const matching = await prisma.tab.update({ 
    where: {
        id: req.body.id, 
    }, 
    data: {
        title: req.body.body,
    },

  })
  console.log(matching)
  res.status(200).json({ message: 'updated' }) 
}