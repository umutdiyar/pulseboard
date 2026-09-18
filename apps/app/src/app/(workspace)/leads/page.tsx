"use client";

import { Suspense } from "react";
import {
  CircleDollarSign,
  Plus,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { ClearFiltersButton } from "@/components/filters/clear-filters-button";
import { FilterBar } from "@/components/filters/filter-bar";
import { SearchFilter } from "@/components/filters/search-filter";
import { SelectFilter } from "@/components/filters/select-filter";

import { filterLeads } from "@/lib/selectors/lead-selectors";
import { useQueryFilters } from "@/hooks/use-query-filters";

import { LeadColumn } from "@/components/leads/lead-column";
import { LeadSummaryCard } from "@/components/leads/lead-summary-card";
import { useRequireAuth } from "@/lib/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/modal-store";
import { useWorkspaceStore } from "@/store/workspace-store";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { toast } from "sonner";

import { isLeadStage } from "@/lib/workspace-dnd";

export default function LeadsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-sm text-slate-500">Leads yükleniyor...</p>
        </main>
      }
    >
      <LeadsPageContent />
    </Suspense>
  );
}

function LeadsPageContent() {
  const { canRenderProtected } = useRequireAuth("/login");
  const openModal = useModalStore((state) => state.openModal);
  const leads = useWorkspaceStore((state) => state.leads);

  const { getFilter, setFilter, clearFilters, hasFilters } = useQueryFilters();

  const search = getFilter("q");
  const stage = getFilter("stage");
  const priority = getFilter("priority");
  const owner = getFilter("owner");

  const filteredLeads = filterLeads(leads, {
    search,
    stage,
    priority,
    owner,
  });

  const ownerOptions = Array.from(new Set(leads.map((lead) => lead.owner))).map(
    (ownerName) => ({
      label: ownerName,
      value: ownerName,
    }),
  );

  const totalValue = leads.reduce((total, lead) => total + lead.value, 0);

  const wonDeals = leads.filter((lead) => lead.stage === "Won").length;

  const conversionRate =
    leads.length === 0 ? 0 : Math.round((wonDeals / leads.length) * 100);

  const formattedTotalValue = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(totalValue);

  const moveLead = useWorkspaceStore((state) => state.moveLead);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  function handleLeadDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const leadId = String(active.id);
    const targetStage = String(over.id);

    if (!isLeadStage(targetStage)) {
      return;
    }

    const lead = leads.find((item) => item.id === leadId);

    if (!lead) {
      return;
    }

    if (lead.stage === targetStage) {
      return;
    }

    moveLead(leadId, targetStage);

    toast.success("Pipeline güncellendi", {
      description: `${lead.name} yeni aşamaya taşındı.`,
    });
  }

  const leadColumns = [
    {
      title: "New" as const,
      description: "Yeni gelen fırsatlar",
      leads: filteredLeads.filter((lead) => lead.stage === "New"),
    },
    {
      title: "Qualified" as const,
      description: "Uygunluğu doğrulananlar",
      leads: filteredLeads.filter((lead) => lead.stage === "Qualified"),
    },
    {
      title: "Proposal" as const,
      description: "Teklif aşamasında",
      leads: filteredLeads.filter((lead) => lead.stage === "Proposal"),
    },
    {
      title: "Won" as const,
      description: "Kazanılan fırsatlar",
      leads: filteredLeads.filter((lead) => lead.stage === "Won"),
    },
  ];

  const summaryCards = [
    {
      title: "Pipeline Value",
      value: formattedTotalValue,
      description: "Toplam fırsat değeri",
      icon: CircleDollarSign,
    },
    {
      title: "Total Leads",
      value: String(leads.length),
      description: "Aktif pipeline içinde",
      icon: Users,
    },
    {
      title: "Won Deals",
      value: String(wonDeals),
      description: "Bu ay kazanılan",
      icon: Target,
    },
    {
      title: "Conversion",
      value: `${conversionRate}%`,
      description: "Pipeline dönüşüm oranı",
      icon: TrendingUp,
    },
  ];

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

            <Button className="rounded-2xl" onClick={() => openModal("lead")}>
              <Plus size={18} />
              Yeni Müşteri Adayı
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

      <FilterBar>
        <SearchFilter
          value={search}
          onChange={(value) => setFilter("q", value)}
          placeholder="Lead ara..."
        />

        <SelectFilter
          value={stage}
          onChange={(value) => setFilter("stage", value)}
          placeholder="Tüm aşamalar"
          options={[
            {
              label: "Yeni",
              value: "New",
            },
            {
              label: "Nitelikli",
              value: "Qualified",
            },
            {
              label: "Teklif",
              value: "Proposal",
            },
            {
              label: "Kazanıldı",
              value: "Won",
            },
          ]}
        />

        <SelectFilter
          value={priority}
          onChange={(value) => setFilter("priority", value)}
          placeholder="Tüm öncelikler"
          options={[
            {
              label: "Düşük",
              value: "Low",
            },
            {
              label: "Orta",
              value: "Medium",
            },
            {
              label: "Yüksek",
              value: "High",
            },
          ]}
        />

        <SelectFilter
          value={owner}
          onChange={(value) => setFilter("owner", value)}
          placeholder="Tüm sahipler"
          options={ownerOptions}
        />

        <ClearFiltersButton visible={hasFilters()} onClear={clearFilters} />
      </FilterBar>

      <DndContext sensors={sensors} onDragEnd={handleLeadDragEnd}>
        <section className="grid gap-5 xl:grid-cols-4">
          {leadColumns.map((column) => (
            <LeadColumn key={column.title} column={column} />
          ))}
        </section>
      </DndContext>
    </div>
  );
}
