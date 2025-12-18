"use client";

import { createContext, useContext, useEffect, useState } from "react";

type HistoryContextType = {
  history: string[];
  addHistory: (title: string) => void;
};

const HistoryContext = createContext<HistoryContextType | null>(null);

export const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [history, setHistory] = useState<string[]>([]);

  // refresh хийсэн ч history хадгалах
  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const addHistory = (title: string) => {
    setHistory((prev) => {
      if (prev.includes(title)) return prev;

      const updated = [title, ...prev].slice(0, 10);
      localStorage.setItem("history", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory must be used inside HistoryProvider");
  return ctx;
};
