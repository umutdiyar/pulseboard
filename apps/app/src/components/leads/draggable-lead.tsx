"use client";

import type { ReactNode } from "react";

import { useDraggable } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

import type { Lead } from "@/types/workspace";

type DraggableLeadProps = {
  lead: Lead;
  children: ReactNode;
};

export function DraggableLead({ lead, children }: DraggableLeadProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: lead.id,

      data: {
        type: "lead",
        leadId: lead.id,
        stage: lead.stage,
      },
    });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      {...attributes}
      {...listeners}
      className={isDragging ? "cursor-grabbing opacity-40" : "cursor-grab"}
    >
      {children}
    </div>
  );
}
