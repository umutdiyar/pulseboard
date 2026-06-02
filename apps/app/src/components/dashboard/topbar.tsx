"use client";

import { useRouter } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export function Topbar() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu size={18} />
          </Button>

          <div>
            <p className="text-sm font-semibold text-slate-900">Dashboard</p>
            <p className="hidden text-xs text-slate-500 sm:block">
              Task, sprint ve lead yönetimi genel görünüm
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

          <Button
            variant="outline"
            onClick={() => {
              logout();
              router.replace("/login");
            }}
          >
            Çıkış
          </Button>
        </div>
      </div>
    </header>
  );
}
