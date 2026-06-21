"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { sprintTasks } from "@/data/dashboard-data";

export function SprintOverview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Sprint 03 Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Bu sprintte 18 görevden 13 tanesi tamamlandı.
          </p>
        </div>

        <Badge className="rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-50">
          72%
        </Badge>
      </div>

      <div className="mt-6">
        <div className="h-3 rounded-full bg-slate-100">
          <div className="h-3 w-[72%] rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500" />
        </div>

        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>Başlangıç</span>
          <span>72% tamamlandı</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {sprintTasks.map((task) => {
          const Icon = task.icon;

          return (
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <Icon size={17} className="text-slate-500" />
                <span className="text-sm font-medium text-slate-700">
                  {task.title}
                </span>
              </div>
              <span className="text-xs text-slate-500">{task.status}</span>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
