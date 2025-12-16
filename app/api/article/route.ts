import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (request: Request) => {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    const { title, content, summary } = await request.json();

    if (!title || !content || !summary) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        summary,
        user: {
          connect: { id: user.id }, // 👈 Clerk хэрэглэгчтэй холбож байна
        },
      },
    });

    return new Response(JSON.stringify(article), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create article" }), {
      status: 500,
    });
  }
};
export const GET = async (request: Request) => {
  try {
    const articles = await prisma.article.findMany();
    return new Response(JSON.stringify({ articles }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all articles", { status: 501 });
  }
};

// export const GET = async () => {
//   try {
//     const articles = await prisma.article.findMany();
//     return new Response(JSON.stringify(articles), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response("Failed to fetch articles", { status: 500 });
//   }
// };
