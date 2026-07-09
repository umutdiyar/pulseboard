"use client";

import { useRouter } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";

export function Topbar() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="sticky top-0 z-40 h-16 shrink-0 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <MobileSidebar />

          <div>
            <h1 className="text-sm font-semibold text-zinc-950 tracking-tight">
              Dashboard
            </h1>
            <p className="hidden text-xs text-zinc-500 sm:block">
              Workspace genel görünüm
            </p>
          </div>
        </div>

        <div className="hidden w-full max-w-md items-center md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Proje, görev veya lead ara..."
              className="h-10 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Bell size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
