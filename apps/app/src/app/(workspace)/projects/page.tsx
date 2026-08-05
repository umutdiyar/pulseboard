"use client";

import { FolderKanban, Plus, Search, SlidersHorizontal } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { useRequireAuth } from "@/lib/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/modal-store";
import { useWorkspaceStore } from "@/store/workspace-store";

export default function ProjectsPage() {
  const { canRenderProtected } = useRequireAuth("/login");
  const openModal = useModalStore((state) => state.openModal);
  const projects = useWorkspaceStore((state) => state.projects);

  if (!canRenderProtected) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Projects yükleniyor...</p>
      </main>
    );
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="relative p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_90%_10%,rgba(99,102,241,0.14),transparent_40%),radial-gradient(800px_circle_at_10%_100%,rgba(16,185,129,0.12),transparent_45%)]" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <FolderKanban size={22} />
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Projects
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Workspace içindeki projeleri, ilerlemeyi, görev sayılarını ve
                sahiplik durumunu tek yerden takip et.
              </p>
            </div>

            <Button
              className="rounded-2xl"
              onClick={() => openModal("project")}
            >
              <Plus size={18} />
              Yeni Proje
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Project ara..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-slate-100"
          />
        </div>

        <Button variant="outline" className="rounded-2xl">
          <SlidersHorizontal size={18} />
          Filters
        </Button>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </section>
    </div>
  );
}
