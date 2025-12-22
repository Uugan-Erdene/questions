import { GoogleGenAI } from "@google/genai";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { error } from "console";
const geminiApi = new GoogleGenAI({ apiKey: process.env.GEMINI_AI_TOKEN });

export const POST = async (request: NextRequest) => {
  try {
    const { title, content, userId } = await request.json();

    if (!title || !content || !userId) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }
    const res = await geminiApi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Доорх нийтлэлийн товч хураангуйг 2–3 өгүүлбэрээр Монгол хэл дээр гарга:\n\n${content}`,
            },
          ],
        },
      ],
    });
    console.log(res);
    const { candidates } = res as any;
    const summary = candidates[0].content.parts[0].text;
    console.log(summary, "wdas");

    const article = await prisma.article.create({
      data: {
        title: title,
        content: content,
        summary: summary,
        userId: userId,
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

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return Response.json(
        { error: "Article id is required" },
        { status: 400 }
      );
    }

    const articles = await prisma.article.findMany({ where: { id } });
    if (!articles) {
      return Response.json({ error: "Article id not found" }, { status: 404 });
    }
    return new Response(JSON.stringify({ articles }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all articles", { status: 50 });
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
