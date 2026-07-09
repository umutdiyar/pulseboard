"use client";

import type { LeadColumn as LeadColumnType } from "@/data/leads-data";
import { LeadCard } from "@/components/leads/lead-card";

const stageDotClasses: Record<LeadColumnType["title"], string> = {
  New: "bg-cyan-500",
  Qualified: "bg-indigo-500",
  Proposal: "bg-amber-500",
  Won: "bg-emerald-500",
};

export function LeadColumn({ column }: { column: LeadColumnType }) {
  return (
    <section className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`h-3 w-3 rounded-full ${stageDotClasses[column.title]}`}
          />

          <div>
            <h2 className="text-sm font-semibold text-slate-950">
              {column.title}
            </h2>
            <p className="text-xs text-slate-500">{column.description}</p>
          </div>
        </div>

        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
          {column.leads.length}
        </span>
      </div>

      <div className="space-y-3">
        {column.leads.length > 0 ? (
          column.leads.map((lead, index) => (
            <LeadCard key={lead.id} lead={lead} index={index} />
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center">
            <p className="text-sm font-medium text-slate-700">Boş pipeline</p>
            <p className="mt-1 text-xs text-slate-400">
              Yeni lead buraya düşecek.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
