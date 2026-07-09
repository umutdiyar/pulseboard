"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

type RoleCardProps = {
  role: string;
  description: string;
  index: number;
};

export function RoleCard({ role, description, index }: RoleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
        <ShieldCheck size={19} />
      </div>

      <h3 className="mt-5 text-sm font-semibold text-slate-950">{role}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </motion.article>
  );
}
