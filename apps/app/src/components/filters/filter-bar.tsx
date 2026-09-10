import type { ReactNode } from "react";

type FilterBarProps = {
  children: ReactNode;
};

export function FilterBar({ children }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center">
      {children}
    </div>
  );
}
