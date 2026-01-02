import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, name, clerkId } = await req.json();
  try {
    // const user = await prisma.user.create({ data: { email, name, clerkId } });
  } catch (error) {
    console.log(error);
  }
  return new Response("sussec");
};
