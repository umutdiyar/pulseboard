"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { recentTasks } from "@/data/dashboard-data";

export function RecentTasks() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.25 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Recent Tasks</h2>
        <p className="mt-1 text-sm text-slate-500">
          Son hareket gören görevler.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {recentTasks.map((task) => (
          <div
            key={task.title}
            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800">
                {task.title}
              </p>
              <p className="text-xs text-slate-500">{task.project}</p>
            </div>

            <Badge
              variant="secondary"
              className="shrink-0 rounded-full bg-white"
            >
              {task.priority}
            </Badge>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
