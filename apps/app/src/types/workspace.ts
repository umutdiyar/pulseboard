export type ProjectStatus = "Planning" | "Active" | "Paused" | "Completed";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  owner: string;
  tasks: number;
  completedTasks: number;
  dueDate: string;
};

export type TaskStatus = "Todo" | "In Progress" | "Review" | "Done";

export type TaskPriority = "Low" | "Medium" | "High";

export type Task = {
  id: string;
  title: string;
  description: string;
  project: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
};

export type LeadStage = "New" | "Qualified" | "Proposal" | "Won";

export type LeadPriority = "Low" | "Medium" | "High";

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  value: number;
  stage: LeadStage;
  priority: LeadPriority;
  owner: string;
  lastContact: string;
  notes?: string;
};

export type TeamRole = "Owner" | "Admin" | "Member";

export type TeamStatus = "Active" | "Pending";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: TeamStatus;
  joinedAt: string;
};
