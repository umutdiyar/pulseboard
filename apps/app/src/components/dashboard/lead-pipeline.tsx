"use client";

import { leadPipeline } from "@/data/dashboard-data";
import { motion } from "framer-motion";

export function LeadPipeline() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Lead Pipeline</h2>
        <p className="mt-1 text-sm text-slate-500">
          Mini CRM akışındaki fırsatlar.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {leadPipeline.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="text-slate-500">{item.count}</span>
            </div>

            <div className="h-2 rounded-full bg-slate-100">
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
