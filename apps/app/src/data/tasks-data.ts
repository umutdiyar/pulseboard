import {
  AlertCircle,
  Circle,
  Clock3,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

import type { Task, TaskStatus } from "@/types/workspace";

export type TaskColumn = {
  title: TaskStatus;
  description: string;
  icon: LucideIcon;
  tasks: Task[];
};

export const tasks: Task[] = [
  {
    id: "t-1",
    title: "Auth guard polish",
    description: "Login olmuş kullanıcıları dashboard’a yönlendir.",
    project: "PulseBoard App",
    assignee: "Umut",
    priority: "High",
    status: "Todo",
    dueDate: "Bugün",
  },
  {
    id: "t-2",
    title: "Workspace switcher UI",
    description: "Sidebar içinde workspace değiştirici alanı geliştir.",
    project: "PulseBoard App",
    assignee: "Demo User",
    priority: "Medium",
    status: "In Progress",
    dueDate: "Yarın",
  },
  {
    id: "t-3",
    title: "Projects card hover states",
    description: "Project kartlarına polish animasyonları ekle.",
    project: "Projects",
    assignee: "Umut",
    priority: "Low",
    status: "Review",
    dueDate: "12 Mar",
  },
  {
    id: "t-4",
    title: "Dashboard metric cards",
    description: "Dashboard metrik kartlarını Framer Motion ile iyileştir.",
    project: "Dashboard",
    assignee: "Demo User",
    priority: "Medium",
    status: "Done",
    dueDate: "Tamamlandı",
  },
  {
    id: "t-5",
    title: "Lead pipeline mock data",
    description: "Mini CRM için başlangıç pipeline verilerini hazırla.",
    project: "CRM",
    assignee: "Umut",
    priority: "High",
    status: "In Progress",
    dueDate: "14 Mar",
  },
];

export const taskColumns: TaskColumn[] = [
  {
    title: "Todo",
    description: "Planlanan işler",
    icon: Circle,
    tasks: tasks.filter((task) => task.status === "Todo"),
  },
  {
    title: "In Progress",
    description: "Aktif geliştirme",
    icon: Clock3,
    tasks: tasks.filter((task) => task.status === "In Progress"),
  },
  {
    title: "Review",
    description: "Kontrol bekleyenler",
    icon: AlertCircle,
    tasks: tasks.filter((task) => task.status === "Review"),
  },
  {
    title: "Done",
    description: "Tamamlanan işler",
    icon: CheckCircle2,
    tasks: tasks.filter((task) => task.status === "Done"),
  },
];
