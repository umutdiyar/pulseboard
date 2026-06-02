"use client";

import { FolderKanban, ListTodo, Target, Users } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { SprintOverview } from "@/components/dashboard/sprint-overview";
import { LeadPipeline } from "@/components/dashboard/lead-pipeline";
import { RecentTasks } from "@/components/dashboard/recent-tasks";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { useRequireAuth } from "@/lib/auth/auth-guard";
import { useAuthStore } from "@/store/auth-store";

export default function DashboardPage() {
  const { canRenderProtected } = useRequireAuth("/login");
  const user = useAuthStore((s) => s.user);

  if (!canRenderProtected) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Dashboard yükleniyor...</p>
      </main>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-slate-500">
              PulseBoard Demo
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Hoş geldin, {user?.name ?? "Demo User"}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Bugünkü workspace durumun burada. Projeler, sprintler, görevler ve
              lead pipeline tek yerden takip ediliyor.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950 px-4 py-3 text-white">
            <p className="text-xs text-white/50">Current Sprint</p>
            <p className="text-sm font-semibold">Sprint 03 · 72%</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Aktif Proje"
          value="12"
          change="+8%"
          icon={FolderKanban}
          delay={0}
        />
        <MetricCard
          title="Açık Görev"
          value="38"
          change="+12%"
          icon={ListTodo}
          delay={0.05}
        />
        <MetricCard
          title="Yeni Lead"
          value="9"
          change="+4%"
          icon={Target}
          delay={0.1}
        />
        <MetricCard
          title="Takım Üyesi"
          value="14"
          change="+2"
          icon={Users}
          delay={0.15}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <SprintOverview />
        <LeadPipeline />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <RecentTasks />
        <ActivityFeed />
      </section>
    </div>
  );
}
