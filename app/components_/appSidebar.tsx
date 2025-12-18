"use client";
import { Sidebar } from "@/components/ui/sidebar";
import { useHistory } from "../feuters/historyProvider";

export function AppSidebar() {
  const { history } = useHistory();
  return (
    <Sidebar className="h-full pt-14 ">
      <div className="px-4 py-4 flex flex-col gap-7">
        <div>
          <h1 className="font-semibold cursor-pointer">History</h1>
        </div>
        <div className="flex flex-col gap-2">
          {history.length === 0 && (
            <p className="text-sm text-muted-foreground">No history yet</p>
          )}
          {history.map((item, index) => (
            <p
              key={index}
              className="text-sm font-medium h-12 w-54 cursor-pointer"
            >
              {item}
            </p>
          ))}

          {/* <p className="text-sm font-medium h-12 w-54 cursor-pointer">
            Figma ашиглах заавар
          </p>
          <p className="text-sm font-medium h-12 w-54 cursor-pointer">
            Санхүүгийн шийдвэрүүд
          </p> */}
        </div>
      </div>
    </Sidebar>
  );
}
