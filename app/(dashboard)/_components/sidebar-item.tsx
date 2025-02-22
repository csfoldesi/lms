"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const isActive = (pathName === "/" && href === "/") || pathName === href || pathName.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 border-r-4 border-transparent",
        isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700 border-sky-700"
      )}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={cn("text-slate-500", isActive && "text-sky-700")} />
        {label}
      </div>
    </button>
  );
};
