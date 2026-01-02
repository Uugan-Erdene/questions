import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { error: "Article id is required" },
        { status: 400 }
      );
    }

    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return Response.json({ error: "Article not found" }, { status: 404 });
    }

    return Response.json(article);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}
