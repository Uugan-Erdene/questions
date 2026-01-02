import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_AI_TOKEN,
});
export const POST = async (request: Request) => {
  try {
    const { content, articleId } = await request.json();

    if (!content) {
      return new Response(JSON.stringify({ message: "Content is required" }), {
        status: 400,
      });
    }

    const existingQuizzes = await prisma.quiz.findMany({
      where: { articleId: articleId },
    });

    if (existingQuizzes.length >= 5) {
      return NextResponse.json({ quizzes: existingQuizzes });
    }

    const remaining = Math.min(5 - existingQuizzes.length, 5);

    if (remaining <= 0) {
      return NextResponse.json({ quizzes: existingQuizzes });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a JSON API.
 
Return ONLY raw JSON.
No markdown.
No explanations.
No code fences.
 
CRITICAL RULES:
- You MUST return EXACTLY 5 questions.
- Do NOT return more or fewer.
- Each question MUST have 4 options (A, B, C, D).
- Each answer MUST be one of: A, B, C, D.
 
JSON format:
{
  "questions": [
    {
      "question": "",
      "options": {
        "A": "",
        "B": "",
        "C": "",
        "D": ""
      },
      "answer": "A"
    }
  ]
}
 
Article:
${content}
`,
    });

    const quizText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!quizText) {
      return new Response(
        JSON.stringify({ message: "Gemini returned no quiz text" }),
        { status: 429 }
      );
    }
    let quiz;
    try {
      const cleaned = quizText.match(/\{[\s\S]*\}/)?.[0];
      if (!cleaned) throw new Error("No JSON found");
      quiz = JSON.parse(cleaned);
    } catch {
      return new Response(
        JSON.stringify({ message: "Invalid JSON returned by Gemini" }),
        { status: 403 }
      );
    }
    try {
      if (!quiz) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }

      const quizes = quiz.questions;

      const article = await prisma.quiz.createMany({
        data: quizes.map((q: any) => ({
          question: q.question,
          options: Object.values(q.options),
          articleId: articleId,
          answer: q.answer,
        })),
      });
      return NextResponse.json({ article }, { status: 201 });
    } catch (err) {
      console.log(err);
    }
  } catch (error: any) {
    console.error("CREATE QUIZ ERROR:", error);

    return new Response(
      JSON.stringify({
        message: "Failed to create quiz",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
export const GET = async (request: Request) => {
  try {
    const { articleId } = await request.json();
    const quiz = await prisma.quiz.findMany({
      where: { articleId: articleId },
    });
    return new Response(JSON.stringify({ articleget: quiz }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
  }
};
