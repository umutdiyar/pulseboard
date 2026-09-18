"use client";

import type { ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";

import type { LeadStage } from "@/types/workspace";

type LeadDropZoneProps = {
  stage: LeadStage;
  children: ReactNode;
};

export function LeadDropZone({ stage, children }: LeadDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,

    data: {
      type: "lead-column",
      stage,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={[
        "min-h-[180px] rounded-2xl transition",
        isOver ? "bg-emerald-50/70 ring-2 ring-emerald-100" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
