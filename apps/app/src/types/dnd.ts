import type { LeadStage, TaskStatus } from "@/types/workspace";

export type TaskDragData = {
  type: "task";
  taskId: string;
  status: TaskStatus;
};

export type TaskColumnDragData = {
  type: "task-column";
  status: TaskStatus;
};

export type LeadDragData = {
  type: "lead";
  leadId: string;
  stage: LeadStage;
};

export type LeadColumnDragData = {
  type: "lead-column";
  stage: LeadStage;
};

export type WorkspaceDragData =
  | TaskDragData
  | TaskColumnDragData
  | LeadDragData
  | LeadColumnDragData;
