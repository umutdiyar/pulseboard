"use client";

import type { TaskColumn as TaskColumnType } from "@/data/tasks-data";
import { TaskCard } from "@/components/tasks/task-card";

export function TaskColumn({ column }: { column: TaskColumnType }) {
  const Icon = column.icon;

  return (
    <section className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
            <Icon size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-950">
              {column.title}
            </h2>
            <p className="text-xs text-slate-500">{column.description}</p>
          </div>
        </div>

        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
          {column.tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {column.tasks.length > 0 ? (
          column.tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center">
            <p className="text-sm font-medium text-slate-700">Boş kolon</p>
            <p className="mt-1 text-xs text-slate-400">
              Buraya görev sürüklenecek.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
