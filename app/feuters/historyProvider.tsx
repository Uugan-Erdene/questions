"use client";
import { createContext, useContext, useEffect, useState } from "react";

type HistoryItem = {
  id: string;
  title: string;
  summary: string;
};

type HistoryContextType = {
  history: HistoryItem[];
  selected: HistoryItem | null;
  addHistory: (item: HistoryItem) => void;
  selectHistory: (item: HistoryItem) => void;
};

const HistoryContext = createContext<HistoryContextType | null>(null);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const addHistory = (item: HistoryItem) => {
    setHistory((prev) => {
      if (prev.find((h) => h.id === item.id)) return prev;
      return [item, ...prev];
    });
  };

  const selectHistory = (item: HistoryItem) => {
    setSelected(item);
  };

  return (
    <HistoryContext.Provider
      value={{ history, selected, addHistory, selectHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory must be used inside HistoryProvider");
  return ctx;
};
