"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  delay?: number;
  description: string;
};

export function MetricCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  delay = 0,
}: MetricCardProps) {
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

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          {change}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm text-zinc-500 font-medium">{title}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
          {value}
        </p>
        <p className="mt-2 text-sm text-zinc-500 leading-5">{description}</p>
      </div>
    </motion.div>
  );
}
