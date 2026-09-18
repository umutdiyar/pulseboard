import type { LeadStage, TaskStatus } from "@/types/workspace";

export const taskStatuses: TaskStatus[] = [
  "Todo",
  "In Progress",
  "Review",
  "Done",
];

export const leadStages: LeadStage[] = ["New", "Qualified", "Proposal", "Won"];

export function isTaskStatus(value: string): value is TaskStatus {
  return taskStatuses.includes(value as TaskStatus);
}

export function isLeadStage(value: string): value is LeadStage {
  return leadStages.includes(value as LeadStage);
}
