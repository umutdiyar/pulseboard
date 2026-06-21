"use client";

import { ChevronsUpDown, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// import { useAuthStore } from "@/store/auth-store";

export function WorkspaceSwitcher() {
  //   const workspace = useAuthStore((state) => state.workspace);

  return (
    <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:bg-slate-100">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
          <Sparkles size={18} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-950">
            {/* {workspace?.name ?? "PulseBoard Demo"} */}
            PulseBoard Demo
          </p>
          <div className="mt-1 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="rounded-full px-2 py-0 text-[10px]"
            >
              Owner
            </Badge>
            <span className="text-[11px] text-slate-500">Free Plan</span>
          </div>
        </div>
      </div>

      <ChevronsUpDown size={16} className="shrink-0 text-slate-400" />
    </button>
  );
}
