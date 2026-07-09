"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type LeadSummaryCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
};

export function LeadSummaryCard({
  title,
  value,
  description,
  icon: Icon,
  delay = 0,
}: LeadSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
          <Icon size={19} />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
          {value}
        </p>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
    </motion.div>
  );
}
