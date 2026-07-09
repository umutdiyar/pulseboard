"use client";

import Link from "next/link";
import {
  BarChart3,
  FolderKanban,
  ListTodo,
  Settings,
  Sparkles,
  Target,
  Users,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WorkspaceSwitcher } from "@/components/dashboard/workspace-switcher";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Tasks", href: "/tasks", icon: ListTodo },
  { label: "Leads", href: "/leads", icon: Target },
  { label: "Team", href: "/team", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function MobileSidebar() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <BarChart3 size={18} />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="border-b border-slate-200 p-5 text-left">
          <SheetTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Sparkles size={18} />
            </div>
            <span>PulseBoard</span>
          </SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <WorkspaceSwitcher />
        </div>

        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const pathname = usePathname();
            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={[
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                ].join(" ")}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-slate-200 p-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-xs font-bold text-white">
                AU
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-950">
                  {user?.name ?? "Admin User"}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {user?.email ?? "admin@pulseboard.app"}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="mt-3 w-full rounded-2xl bg-white text-xs"
              onClick={() => {
                logout();
                router.replace("/login");
              }}
            >
              <LogOut size={14} />
              Çıkış yap
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
