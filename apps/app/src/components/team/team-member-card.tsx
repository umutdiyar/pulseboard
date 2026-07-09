"use client";

import { motion } from "framer-motion";
import { Mail, MoreHorizontal, ShieldCheck } from "lucide-react";
import type { TeamMember } from "@/data/team-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const roleClasses: Record<TeamMember["role"], string> = {
  Owner: "bg-slate-950 text-white hover:bg-slate-950",
  Admin: "bg-indigo-50 text-indigo-700 hover:bg-indigo-50",
  Member: "bg-slate-100 text-slate-700 hover:bg-slate-100",
};

const statusClasses: Record<TeamMember["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
  Pending: "bg-amber-50 text-amber-700 hover:bg-amber-50",
};

const statusLabels: Record<TeamMember["status"], string> = {
  Active: "Aktif",
  Pending: "Davet Bekliyor",
};

const roleLabels: Record<TeamMember["role"], string> = {
  Owner: "Sahip",
  Admin: "Yönetici",
  Member: "Üye",
};

export function TeamMemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-white">
            {initials}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-950">
              {member.name}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <Mail size={13} />
              {member.email}
            </div>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="rounded-2xl">
          <MoreHorizontal size={18} />
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge className={`rounded-full ${roleClasses[member.role]}`}>
          {roleLabels[member.role]}
        </Badge>
        <Badge className={`rounded-full ${statusClasses[member.status]}`}>
          {statusLabels[member.status]}
        </Badge>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={14} />
          Workspace access
        </div>
        <p className="mt-1 text-sm font-medium text-slate-900">
          {member.joinedAt}
        </p>
      </div>
    </motion.article>
  );
}
