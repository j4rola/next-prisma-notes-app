// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); 

export default async function handler(req, res) {

    try {

        console.log(req.body.tabId)
        console.log(req.body.body)

        console.log(req.body.id)
        const newNote = await prisma.note.create({
        data: {
            body: req.body.body,
            tabId: req.body.tabId
            }
        })
        
        res.status(200).json({ notes: newNote })  

    } catch (error) {
        console.log(error)
    }
  
}
