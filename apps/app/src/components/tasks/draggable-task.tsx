"use client";

import type { ReactNode } from "react";

import { useDraggable } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

import type { Task } from "@/types/workspace";

type DraggableTaskProps = {
  task: Task;
  children: ReactNode;
};

export function DraggableTask({ task, children }: DraggableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,

      data: {
        type: "task",
        taskId: task.id,
        status: task.status,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={isDragging ? "cursor-grabbing opacity-40" : "cursor-grab"}
    >
      {children}
    </div>
  );
}
