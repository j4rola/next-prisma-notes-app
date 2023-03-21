// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); 

export default async function handler(req, res) {

  console.log(req.body.id)
  const matching = await prisma.note.findMany({
    where: {
      tabId: req.body.id
    }
  })
  console.log(matching)
  res.status(200).json({ notes: matching }) 
}