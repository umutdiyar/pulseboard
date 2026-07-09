"use client";

import { motion } from "framer-motion";
import { Mail, MoreHorizontal, UserRound } from "lucide-react";
import type { Lead } from "@/data/leads-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const priorityClasses: Record<Lead["priority"], string> = {
  Low: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  Medium: "bg-amber-50 text-amber-700 hover:bg-amber-50",
  High: "bg-red-50 text-red-700 hover:bg-red-50",
};

export function LeadCard({ lead, index }: { lead: Lead; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <Badge className={`rounded-full ${priorityClasses[lead.priority]}`}>
          {lead.priority}
        </Badge>

        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
          <MoreHorizontal size={16} />
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-white">
          {lead.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-950">
            {lead.name}
          </h3>
          <p className="truncate text-xs text-slate-500">{lead.company}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-3">
        <p className="text-[11px] text-slate-500">Estimated value</p>
        <p className="mt-1 text-lg font-semibold text-slate-950">
          {lead.value}
        </p>
      </div>

      <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Mail size={14} />
          <span className="truncate">{lead.email}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <UserRound size={14} />
            <span>{lead.owner}</span>
          </div>

          <span>{lead.lastContact}</span>
        </div>
      </div>
    </motion.article>
  );
}
