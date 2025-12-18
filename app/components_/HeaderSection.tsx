"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { DarkStar } from "../icons/darkStar";
import { NoteBook } from "../icons/notebook";
import { useUser } from "@clerk/nextjs";
import { Book } from "../icons/theBook";
import { QuizSection } from "../feuters/quizSection";
import { useHistory } from "../feuters/historyProvider";
import { Spinner } from "@/components/ui/spinner";
export const HeaderSection = () => {
  type Step = 1 | 2 | 3;
  const [step, setStep] = useState<Step>(1);
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { addHistory } = useHistory();
  const handleGenerateQuiz = async () => {
    if (!title || !content || !user) {
      alert("Title болон content хоёуланг нь бөглөнө үү");
      return;
    }
    try {
      setLoading(true);

      const res = await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          userId: user?.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create article");
      }

      const data = await res.json();
      addHistory(title);
      setSummary(data.summary || "successufly");
      setStep(2);

      console.log("Created article:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log(title, "titlehsbfi");
      console.log(content, "iubfiusbdfwiufb");
    }
  };

  return (
    <div className="max-w-[856px] mx-auto border border-[#E4E4E7] rounded-lg shadow-sm px-6 sm:px8 py-8 sm:py-10 flex flex-col gap-4">
      {step === 1 && (
        <>
          <div>
            <h1 className="text-[18px] flex items-center gap-2 font-bold">
              <DarkStar /> Article Quiz Generator
            </h1>
            <p className="text-[14px] text-muted-foreground mt-1">
              Paste your article below to generate a summary and quiz question.
              Your articles will be saved in the sidebar for future reference.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#71717A] flex items-center gap-2">
                <NoteBook />
                Article Title
              </label>
              <input
                onKeyPress={(e) => e.key === "Enter" && handleGenerateQuiz()}
                onChange={(e) => setTitle(e.target.value)}
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
                onKeyPress={(e) => e.key === "Enter" && handleGenerateQuiz()}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your article content here…"
                className="h-[150px] border-[#E4E4E7] w-full"
              />
            </div>

            <div className="flex justify-end">
              <button
                className="w-full sm:w-40 h-10 rounded bg-[#E4E4E7] text-white hover:bg-gray-300 cursor-pointer"
                onClick={handleGenerateQuiz}
              >
                {loading ? (
                  <span className=" flex justify-center items-center gap-2">
                    <Spinner />
                    Generating...
                  </span>
                ) : (
                  "Generate summary"
                )}
              </button>
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div>
            <h1 className="text-[18px] font-bold flex items-center gap-2">
              <DarkStar />
              Article Quiz Generator
            </h1>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50 flex flex-col gap-2">
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
              <Book /> Summarized content
            </p>

            <h2 className="font-semibold mb-2">{title}</h2>
            <p className="text-sm leading-relaxed">{summary}</p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="border px-4 py-2 rounded cursor-pointer"
            >
              See content
            </button>

            <button
              className="bg-black text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => setStep(3)}
            >
              {loading ? (
                <span className=" flex justify-center items-center gap-2">
                  <Spinner />
                  Take a quizing
                </span>
              ) : (
                "Take a quiz"
              )}
            </button>
          </div>
        </>
      )}
      {step === 3 && <QuizSection onClose={() => setStep(2)} />}
    </div>
  );
};
