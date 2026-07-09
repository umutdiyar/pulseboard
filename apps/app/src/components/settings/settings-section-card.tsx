"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type SettingsSectionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  danger?: boolean;
  index: number;
};

export function SettingsSectionCard({
  title,
  description,
  icon: Icon,
  danger,
  index,
}: SettingsSectionCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={[
        "rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        danger ? "border-red-100" : "border-slate-200",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-11 w-11 items-center justify-center rounded-2xl",
          danger ? "bg-red-50 text-red-600" : "bg-slate-950 text-white",
        ].join(" ")}
      >
        <Icon size={19} />
      </div>

      <h3
        className={[
          "mt-5 text-sm font-semibold",
          danger ? "text-red-700" : "text-slate-950",
        ].join(" ")}
      >
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </motion.article>
  );
}
