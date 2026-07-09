"use client";

import {
  CircleDollarSign,
  Plus,
  Search,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { LeadColumn } from "@/components/leads/lead-column";
import { LeadSummaryCard } from "@/components/leads/lead-summary-card";
import { leadColumns, leadSummary } from "@/data/leads-data";
import { useRequireAuth } from "@/lib/auth/auth-guard";
import { Button } from "@/components/ui/button";

const summaryCards = [
  {
    title: "Pipeline Value",
    value: leadSummary.totalValue,
    description: "Toplam fırsat değeri",
    icon: CircleDollarSign,
  },
  {
    title: "Total Leads",
    value: String(leadSummary.totalLeads),
    description: "Aktif pipeline içinde",
    icon: Users,
  },
  {
    title: "Won Deals",
    value: String(leadSummary.wonDeals),
    description: "Bu ay kazanılan",
    icon: Target,
  },
  {
    title: "Conversion",
    value: leadSummary.conversionRate,
    description: "Pipeline dönüşüm oranı",
    icon: TrendingUp,
  },
];

export default function LeadsPage() {
  const { canRenderProtected } = useRequireAuth("/login");

  if (!canRenderProtected) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Leads yükleniyor...</p>
      </main>
    );
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="relative p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_90%_10%,rgba(16,185,129,0.16),transparent_40%),radial-gradient(800px_circle_at_10%_100%,rgba(99,102,241,0.12),transparent_45%)]" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Target size={22} />
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Leads
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Mini CRM pipeline ile müşteri adaylarını takip et. Yeni
                fırsatlar, teklif aşaması ve kazanılan anlaşmalar tek yerde.
              </p>
            </div>

            <Button className="rounded-2xl">
              <Plus size={18} />
              New Lead
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card, index) => (
          <LeadSummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
            delay={index * 0.05}
          />
        ))}
      </section>

      <section className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Lead ara..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-slate-100"
          />
        </div>

        <Button variant="outline" className="rounded-2xl">
          <SlidersHorizontal size={18} />
          Filters
        </Button>
      </section>

      <section className="grid gap-5 xl:grid-cols-4">
        {leadColumns.map((column) => (
          <LeadColumn key={column.title} column={column} />
        ))}
      </section>
    </div>
  );
}
