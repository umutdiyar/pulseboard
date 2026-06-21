"use client";

import { useRouter } from "next/navigation";
import { LogOut, Settings, User, ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth-store";

function getInitials(name?: string | null) {
  if (!name) return "DU";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function UserMenu() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const name = user?.name || "Demo User";
  const email = user?.email || "demo@pulseboard.app";
  const initials = getInitials(name);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-10 max-w-[220px] gap-2 rounded-full px-2 hover:bg-slate-100 data-[state=open]:bg-slate-100"
          aria-label="Kullanıcı menüsünü aç"
        >
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-400 text-xs font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>

          <span className="hidden min-w-0 truncate text-sm font-medium text-slate-700 sm:block">
            {name}
          </span>

          <ChevronDown className="hidden h-4 w-4 shrink-0 text-slate-500 sm:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-50 w-[calc(100vw-2rem)] max-w-64 rounded-2xl p-2 shadow-lg sm:w-64"
      >
        <DropdownMenuLabel className="px-2 py-2">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-400 text-xs font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {name}
              </p>
              <p className="truncate text-xs font-normal text-slate-500">
                {email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer rounded-xl"
          onClick={() => router.push("/profile")}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profil</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer rounded-xl"
          onClick={() => router.push("/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Ayarlar</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer rounded-xl text-red-600 focus:bg-red-50 focus:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Çıkış yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
