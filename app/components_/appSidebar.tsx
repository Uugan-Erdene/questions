"use client";

import { Sidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";

type HistoryItem = {
  id: string;
  title: string;
};

export function AppSidebar() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const getHistory = async () => {
    try {
      const res = await fetch("/api/article");
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Sidebar className="h-full pt-14">
      <div className="px-4 py-4 flex flex-col gap-7">
        <Link href="/">
          <h1 className="font-semibold cursor-pointer">History</h1>
        </Link>

        <div className="flex flex-col gap-2">
          {history.length === 0 && (
            <p className="text-sm text-muted-foreground">No history yet</p>
          )}

          {history.map((item) => (
            <Link
              key={item.id}
              href={`/articles/${item.id}`}
              className="text-sm font-medium h-12 w-54 cursor-pointer"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}
