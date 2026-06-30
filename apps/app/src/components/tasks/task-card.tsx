"use client";

import { motion } from "framer-motion";
import { CalendarDays, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Task } from "@/data/tasks-data";

const priorityClasses: Record<Task["priority"], string> = {
  Low: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  Medium: "bg-amber-50 text-amber-700 hover:bg-amber-50",
  High: "bg-red-50 text-red-700 hover:bg-red-50",
};

export function TaskCard({ task, index }: { task: Task; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <Badge className={`rounded-full ${priorityClasses[task.priority]}`}>
          {task.priority}
        </Badge>

        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
          <MoreHorizontal size={16} />
        </Button>
      </div>

      <h3 className="mt-4 text-sm font-semibold leading-5 text-slate-950">
        {task.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
        {task.description}
      </p>

      <div className="mt-4 rounded-2xl bg-slate-50 p-3">
        <p className="text-[11px] text-slate-500">Project</p>
        <p className="mt-1 truncate text-xs font-medium text-slate-800">
          {task.project}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-[10px] font-bold text-white">
            {task.assignee
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>

          <span className="text-xs font-medium text-slate-600">
            {task.assignee}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400">
          <CalendarDays size={13} />
          {task.dueDate}
        </div>
      </div>
    </motion.article>
  );
}
