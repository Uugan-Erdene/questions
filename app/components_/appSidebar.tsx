"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { useHistory } from "../feuters/historyProvider";
import Link from "next/link";

export function AppSidebar() {
  const { history } = useHistory();

  return (
    <Sidebar className="h-full pt-14 ">
      <div className="px-4 py-4 flex flex-col gap-7">
        <div>
          <Link href={"/"}>
            <h1 className="font-semibold cursor-pointer">History</h1>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {history.length === 0 && (
            <p className="text-sm text-muted-foreground">No history yet</p>
          )}
          {history.map((item, index) => (
            <Link
              href={`/articles/${item.id}`}
              key={`history-${item.id || index}`}
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
