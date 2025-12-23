"use client";
import { DarkStar } from "@/app/icons/darkStar";
import { Spinner } from "@/components/ui/spinner";
import { Book } from "lucide-react";
import { useParams } from "next/navigation";
import { use, useState } from "react";

export default function Home({ params }: { params: Promise<{ id: string }> }) {
  //   const { id } = use(params);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  console.log(id, "id");

  const getArticle = async () => {
    try {
      // fetch(`/api/article?id=${articleId}`)
      setLoading(true);
      const res = await fetch(`/api/articles?id=${id}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data, "ArticleId");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
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

        <h2 className="font-semibold mb-2">{id}</h2>
        {/* <p className="text-sm leading-relaxed">{summary}</p>  */}
      </div>

      <div className="flex justify-between">
        <button className="border px-4 py-2 rounded cursor-pointer">
          See content
        </button>

        <button
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
          //   onClick={() => setStep(3)}
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
  );
}
