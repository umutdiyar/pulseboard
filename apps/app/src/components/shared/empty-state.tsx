import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100">
        <Icon className="size-5 text-slate-500" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}
