"use client";
import { QuizSection } from "@/app/feuters/quizSection";
import { DarkStar } from "@/app/icons/darkStar";
import { Spinner } from "@/components/ui/spinner";
import { Book } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [article, setArticle] = useState<{
    title: string;
    summary: string;
    content: string;
  } | null>();
  type Quiz = {
    id: string;
    question: string;
    options: string[];
    answer: string;
  };
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [current, setCurrent] = useState(0);
  const currentQuiz = quizzes[current];
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const getArticle = async () => {
    try {
      // fetch(`/api/article?id=${articleId}`)
      setLoading(true);
      const res = await fetch(`/api/articles?id=${id}`);
      const data = await res.json();
      setArticle(data);
      console.log(data, "article");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getArticle();
    }
  }, [id]);
  const handleQuiz = async () => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: article?.content,
          articleId: id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create article");
      }

      const data = await res.json();

      console.log("quiz", data);
      setQuizzes((data.quizzes || data.article || []).slice(0, 5));
      setCurrent(0);
      setPage(2);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswer = (index: number) => {
    if (!currentQuiz) return;
    setSelected(index);
    const correctIndex = currentQuiz.answer.charCodeAt(0) - 65;
    if (index === correctIndex) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      const isLast = current === quizzes.length - 1;
      if (!isLast) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        setPage(3);
      }
    }, 800);
  };

  return (
    <>
      {page === 1 && (
        <div className="max-w-[856px] mx-auto border border-[#E4E4E7] rounded-lg shadow-sm px-6 sm:px8 py-8 sm:py-10 flex flex-col gap-4">
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
            {loading && <Spinner />}

            {!loading && article && (
              <>
                <h2 className="font-semibold">{article.title}</h2>
                <p className="text-sm leading-relaxed">{article.summary}</p>
              </>
            )}

            {!loading && !article && (
              <p className="text-sm text-red-500">Article not found</p>
            )}
          </div>

          <div className="flex justify-between">
            <button className="border px-4 py-2 rounded cursor-pointer">
              See content
            </button>

            <button
              className="bg-black text-white px-4 py-2 rounded cursor-pointer"
              onClick={handleQuiz}
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
        </div>
      )}
      {page === 2 && currentQuiz ? (
        <div className="w-full flex justify-center">
          <div className="max-w-[720px] w-full rounded-xl">
            <div className="flex justify-between mb-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold flex gap-2">
                  <DarkStar /> Quick test
                </h1>
                <p className="text-sm text-muted-foreground">
                  Take a quick test about your knowledge from your content
                </p>
              </div>
              <button
                onClick={() => setPage(1)}
                className="cursor-pointer w-12 h-10 bg-white border border-[#8080803e] rounded-sm"
              >
                ✕
              </button>
            </div>

            <div className="border rounded-lg p-6">
              <div className="flex justify-between mb-4 items-center gap-2 font-medium">
                <p>{currentQuiz.question}</p>
                <span className="text-sm text-gray-400">
                  {current + 1} / {quizzes.length}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {currentQuiz.options.map((opt, index) => {
                  const correctIndex = currentQuiz.answer.charCodeAt(0) - 65;
                  let style = "border";

                  if (selected !== null) {
                    if (index === correctIndex) style = "border bg-green-100";
                    else if (index === selected) style = "border bg-red-100";
                  }

                  return (
                    <button
                      key={index}
                      disabled={selected !== null}
                      onClick={() => handleAnswer(index)}
                      className={`rounded py-3 ${style}`}
                    >
                      {String.fromCharCode(65 + index)}. {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : page === 2 ? (
        <p className="text-center text-gray-400 mt-4">
          Quiz loading or finished...
        </p>
      ) : null}

      {page === 3 && (
        <div className="flex justify-center">
          <div className="max-w-md border rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Result 🎉</h2>
            <p className="text-lg">
              You scored <b>{score}</b> / {quizzes.length}
            </p>

            <button
              onClick={() => {
                setPage(1);
                setQuizzes([]);
                setCurrent(0);
                setSelected(null);
                setScore(0);
              }}
              className="mt-6 bg-black text-white px-4 py-2 rounded"
            >
              Back to article
            </button>
          </div>
        </div>
      )}
    </>
  );
}
