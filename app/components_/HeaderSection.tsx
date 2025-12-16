"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { DarkStar } from "../icons/darkStar";
import { NoteBook } from "../icons/notebook";

export const HeaderSection = () => {
  const [quiz, setQuiz] = useState();
  return (
    <div className="max-w-[856px] mx-auto border border-[#E4E4E7] rounded-lg shadow-sm px-6 sm:px8 py-8 sm:py-10 flex flex-col gap-4">
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
            className="h-10 w-full border-[#E4E4E7] focus:ring-0 focus:border-[#E4A600] border rounded-sm pl-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold  text-[#71717A] flex items-center gap-2">
            <NoteBook />
            Article Content
          </label>
          <Textarea
            placeholder="Paste your article content here…"
            className="h-[150px] border-[#E4E4E7] w-full"
          />
        </div>

        <div className="flex justify-end">
          <button className="w-full sm:w-40 h-10 rounded bg-[#E4E4E7] text-white hover:bg-gray-300 cursor-pointer">
            Generate summary
          </button>
        </div>
      </div>
    </div>
  );
};
