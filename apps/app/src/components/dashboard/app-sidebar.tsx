"use client";

import Link from "next/link";
import {
  BarChart3,
  FolderKanban,
  ListTodo,
  Users,
  Settings,
  Target,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { WorkspaceSwitcher } from "@/components/dashboard/workspace-switcher";
import { UserMenu } from "@/components/dashboard/user-menu";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Tasks", href: "/tasks", icon: ListTodo },
  { label: "Leads", href: "/leads", icon: Target },
  { label: "Team", href: "/team", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const user = useAuthStore((s) => s.user);

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200/70 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-200/70 p-5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
            <Sparkles size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight">PulseBoard</p>
            <p className="text-xs text-slate-500">Workspace SaaS</p>
          </div>
        </Link>
      </div>

      <div className="p-4">
        <WorkspaceSwitcher />
      </div>

      <nav className="flex-1 space-y-1 px-3">
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
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              ].join(" ")}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200/70 p-4">
        <UserMenu />
      </div>
    </aside>
  );
}
