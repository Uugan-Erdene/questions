import prisma from "@/lib/prisma"

export const POST = async (request:Request) { 
   const article =  await prisma.article.create({
        data:await request.json
    })
    return new Response({article},{status:201})
}



export const GET = async (request:Request){
  try {
    const article = prisma.article.findMany()
    return new Response(JSON.stringify({articles}),{status:200})
  } catch (error) {
    console.log(error);
    return new Response ("you failed",{status:500})
  } 
 }