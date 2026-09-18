"use client";

import type { ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";

import type { TaskStatus } from "@/types/workspace";

type TaskDropZoneProps = {
  status: TaskStatus;
  children: ReactNode;
};

export function TaskDropZone({ status, children }: TaskDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,

    data: {
      type: "task-column",
      status,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={[
        "min-h-[180px] rounded-2xl transition",
        isOver ? "bg-indigo-50/70 ring-2 ring-indigo-100" : "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
