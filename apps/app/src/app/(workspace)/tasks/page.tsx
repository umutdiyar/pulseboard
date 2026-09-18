"use client";

import { Suspense } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Clock3,
  ListTodo,
  Plus,
} from "lucide-react";
import { TaskColumn } from "@/components/tasks/task-column";
import { Button } from "@/components/ui/button";

import { filterTasks } from "@/lib/selectors/task-selectors";
import { useRequireAuth } from "@/lib/auth/auth-guard";
import { useModalStore } from "@/store/modal-store";
import { useWorkspaceStore } from "@/store/workspace-store";

import { ClearFiltersButton } from "@/components/filters/clear-filters-button";
import { FilterBar } from "@/components/filters/filter-bar";
import { SearchFilter } from "@/components/filters/search-filter";
import { SelectFilter } from "@/components/filters/select-filter";
import { useQueryFilters } from "@/hooks/use-query-filters";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { isTaskStatus } from "@/lib/workspace-dnd";
import { toast } from "sonner";

export default function TasksPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-sm text-slate-500">Tasks yükleniyor...</p>
        </main>
      }
    >
      <TasksPageContent />
    </Suspense>
  );
}

function TasksPageContent() {
  const { canRenderProtected } = useRequireAuth("/login");
  const openModal = useModalStore((state) => state.openModal);
  const tasks = useWorkspaceStore((state) => state.tasks);

  const projects = useWorkspaceStore((state) => state.projects);
  const members = useWorkspaceStore((state) => state.members);

  const { getFilter, setFilter, clearFilters, hasFilters } = useQueryFilters();

  const search = getFilter("q");
  const projectFilter = getFilter("project");
  const priority = getFilter("priority");
  const assignee = getFilter("assignee");

  const filteredTasks = filterTasks(tasks, {
    search,
    project: projectFilter,
    priority,
    assignee,
  });

  const taskColumns = [
    {
      title: "Todo" as const,
      description: "Planlanan işler",
      icon: Circle,
      tasks: filteredTasks.filter((task) => task.status === "Todo"),
    },
    {
      title: "In Progress" as const,
      description: "Aktif geliştirme",
      icon: Clock3,
      tasks: filteredTasks.filter((task) => task.status === "In Progress"),
    },
    {
      title: "Review" as const,
      description: "Kontrol bekleyenler",
      icon: AlertCircle,
      tasks: filteredTasks.filter((task) => task.status === "Review"),
    },
    {
      title: "Done" as const,
      description: "Tamamlanan işler",
      icon: CheckCircle2,
      tasks: filteredTasks.filter((task) => task.status === "Done"),
    },
  ];

  const moveTask = useWorkspaceStore((state) => state.moveTask);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  function handleTaskDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const taskId = String(active.id);
    const targetStatus = String(over.id);

    if (!isTaskStatus(targetStatus)) {
      return;
    }

    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    if (task.status === targetStatus) {
      return;
    }

    moveTask(taskId, targetStatus);

    toast.success("Görev durumu güncellendi", {
      description: `${task.title} yeni kolona taşındı.`,
    });
  }

  if (!canRenderProtected) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Tasks yükleniyor...</p>
      </main>
    );
  }
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="relative p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_90%_10%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(800px_circle_at_10%_100%,rgba(245,158,11,0.12),transparent_45%)]" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <ListTodo size={22} />
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Tasks
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Sprint içindeki işleri kanban görünümünde takip et. Öncelik,
                assignee, proje ve durum bilgilerini tek yerde gör.
              </p>
            </div>

            <Button className="rounded-2xl" onClick={() => openModal("task")}>
              <Plus size={18} />
              Yeni Görev
            </Button>
          </div>
        </div>
      </section>

      <FilterBar>
        <SearchFilter
          value={search}
          onChange={(value) => setFilter("q", value)}
          placeholder="Görevlerde ara..."
        />

        <SelectFilter
          value={projectFilter}
          onChange={(value) => setFilter("project", value)}
          placeholder="Tüm projeler"
          options={projects.map((project) => ({
            label: project.name,
            value: project.name,
          }))}
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
          value={assignee}
          onChange={(value) => setFilter("assignee", value)}
          placeholder="Tüm üyeler"
          options={members
            .filter((member) => member.status === "Active")
            .map((member) => ({
              label: member.name,
              value: member.name,
            }))}
        />

        <ClearFiltersButton visible={hasFilters()} onClear={clearFilters} />
      </FilterBar>

      <DndContext sensors={sensors} onDragEnd={handleTaskDragEnd}>
        <section className="grid gap-5 xl:grid-cols-4">
          {taskColumns.map((column) => (
            <TaskColumn key={column.title} column={column} />
          ))}
        </section>
      </DndContext>
    </div>
  );
}
