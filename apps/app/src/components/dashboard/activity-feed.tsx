"use client";

import { activities } from "@/data/dashboard-data";
import { motion } from "framer-motion";

export function ActivityFeed() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.3 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Activity Feed</h2>
        <p className="mt-1 text-sm text-slate-500">
          Workspace içindeki son hareketler.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.action} className="flex gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                <Icon size={16} />
              </div>

              <div>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-950">
                    {activity.user}
                  </span>{" "}
                  {activity.action}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
