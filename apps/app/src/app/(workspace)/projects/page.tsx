"use client";

import { FolderKanban, FolderSearch, Plus } from "lucide-react";

import { ProjectCard } from "@/components/projects/project-card";
import { useRequireAuth } from "@/lib/auth/auth-guard";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/modal-store";
import { useWorkspaceStore } from "@/store/workspace-store";
import { ClearFiltersButton } from "@/components/filters/clear-filters-button";
import { FilterBar } from "@/components/filters/filter-bar";
import { SearchFilter } from "@/components/filters/search-filter";
import { SelectFilter } from "@/components/filters/select-filter";
import { EmptyState } from "@/components/shared/empty-state";

import { useQueryFilters } from "@/hooks/use-query-filters";

import { filterProjects } from "@/lib/selectors/project-selectors";

export default function ProjectsPage() {
  const { canRenderProtected } = useRequireAuth("/login");
  const openModal = useModalStore((state) => state.openModal);
  const projects = useWorkspaceStore((state) => state.projects);

  const { getFilter, setFilter, clearFilters, hasFilters } = useQueryFilters();

  const search = getFilter("q");
  const status = getFilter("status");
  const owner = getFilter("owner");

  const filteredProjects = filterProjects(projects, {
    search,
    status,
    owner,
  });

  const ownerOptions = Array.from(
    new Set(projects.map((project) => project.owner)),
  ).map((ownerName) => ({
    label: ownerName,
    value: ownerName,
  }));

  const statusOptions = [
    {
      label: "Planlama",
      value: "Planning",
    },
    {
      label: "Aktif",
      value: "Active",
    },
    {
      label: "Duraklatıldı",
      value: "Paused",
    },
    {
      label: "Tamamlandı",
      value: "Completed",
    },
  ];

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

      <FilterBar>
        <SearchFilter
          value={search}
          onChange={(value) => setFilter("q", value)}
          placeholder="Projelerde ara..."
        />

        <SelectFilter
          value={status}
          onChange={(value) => setFilter("status", value)}
          placeholder="Tüm durumlar"
          options={statusOptions}
        />

        <SelectFilter
          value={owner}
          onChange={(value) => setFilter("owner", value)}
          placeholder="Tüm sahipler"
          options={ownerOptions}
        />

        <ClearFiltersButton visible={hasFilters()} onClear={clearFilters} />
      </FilterBar>

      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderSearch}
          title="Proje bulunamadı"
          description="Arama kriterlerine uygun proje bulunamadı. Filtreleri değiştirerek tekrar deneyin."
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
