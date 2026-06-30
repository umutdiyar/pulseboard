"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, MoreHorizontal } from "lucide-react";
import type { Project } from "@/data/projects-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusClasses: Record<Project["status"], string> = {
  Planning: "bg-indigo-50 text-indigo-700 hover:bg-indigo-50",
  Active: "bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
  Paused: "bg-amber-50 text-amber-700 hover:bg-amber-50",
  Completed: "bg-slate-100 text-slate-700 hover:bg-slate-100",
};

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge className={`rounded-full ${statusClasses[project.status]}`}>
            {project.status}
          </Badge>

          <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-950">
            {project.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {project.description}
          </p>
        </div>

        <Button variant="ghost" size="icon" className="rounded-2xl">
          <MoreHorizontal size={18} />
        </Button>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>

        <div className="h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 size={14} />
            Tasks
          </div>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {project.completedTasks}/{project.tasks}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays size={14} />
            Due
          </div>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {project.dueDate}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-slate-500">Owner</p>
          <p className="text-sm font-medium text-slate-900">{project.owner}</p>
        </div>

        <Button variant="outline" className="rounded-2xl">
          View
        </Button>
      </div>
    </motion.article>
  );
}
