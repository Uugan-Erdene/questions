"use client";
import { Textarea } from "@/components/ui/textarea";
import { DarkStar } from "./icons/darkStar";
import prisma from "@/lib/prisma";
import { NoteBook } from "./icons/notebook";
export default function Home() {
  return (
    <div className="w-[856px] border border-[#E4E4E7] rounded-lg shadow-sm px-6 py-8 ml-40 flex flex-col gap-4">
      <div>
        <h1 className="text-[18px] flex items-center gap-2 font-bold">
          <DarkStar /> Article Quiz Generator
        </h1>
        <p className="text-[14px] text-muted-foreground mt-1">
          Paste your article below to generate a summary and quiz question. Your
          articles will be saved in the sidebar for future reference.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#71717A] flex items-center gap-2">
            <NoteBook />
            Article Title
          </label>
          <input
            placeholder="Enter a title for your article…"
            className="h-10 border-[#E4E4E7] focus:ring-0 focus:border-[#E4A600] border rounded-sm pl-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold  text-[#71717A] flex items-center gap-2">
            <NoteBook />
            Article Content
          </label>
          <Textarea
            placeholder="Paste your article content here…"
            className="h-[150px] border-[#E4E4E7]"
          />
        </div>

        <div className="flex justify-end">
          <button className="w-40 h-10 rounded bg-[#E4E4E7] text-white hover:bg-gray-300">
            Generate summary
          </button>
        </div>
      </div>
    </div>
  );
}
