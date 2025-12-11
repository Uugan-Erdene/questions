"use client";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User2, ChevronUp, ChevronDown } from "lucide-react";


export function AppSidebar() {
  return (
    <Sidebar className="h-full pt-14 ">
      <div className="px-4 py-4 flex flex-col gap-7">
        <div>
          <h1 className="font-semibold">History</h1>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium h-12 w-54">Genghis Khan</p>
          <p className="text-sm font-medium h-12 w-54">Figma ашиглах заавар</p>
          <p className="text-sm font-medium h-12 w-54">Санхүүгийн шийдвэрүүд</p>
          <p className="text-sm font-medium h-12 w-54">
            Figma-д загвар зохион бүтээх аргачлалууд
          </p>
          <p className="text-sm font-medium h-12 w-54">
            Санхүүгийн технологи 2023
          </p>
          <p className="text-sm font-medium h-12 w-54">
            Хэрэглэгчийн интерфейс дизайны шилдэг туршлага
          </p>
          <p className="text-sm font-medium h-12 w-54">
            Архитектур загварчлалын хөтөлбөрүүд
          </p>
          <p className="text-sm font-medium h-12 w-54">
            Эрүүл амьдралын хэв маяг
          </p>
          <p className="text-sm font-medium h-12 w-54">
            Технологийн салбарт хийгдэж буй инноваци
          </p>
        </div>
      </div>
      {/* <SidebarContent> */}
      {/* <SidebarMenu>
          <SidebarMenuItem>History</SidebarMenuItem>
          <SidebarMenuItem>Item 1</SidebarMenuItem>
          <SidebarMenuItem>Item 2</SidebarMenuItem>
        </SidebarMenu> */}
      {/* </SidebarContent> */}
      {/* <SidebarHeader> */}
      {/* <SidebarMenu> */}
      {/* <SidebarMenuItem> */}
      {/* <DropdownMenu> */}
      {/* <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Select Workspace
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger> */}
      {/* <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Corp.</span>
                </DropdownMenuItem>
              </DropdownMenuContent> */}
      {/* </DropdownMenu> */}
      {/* </SidebarMenuItem> */}
      {/* </SidebarMenu> */}
      {/* </SidebarHeader> */}
    </Sidebar>
  );
}
