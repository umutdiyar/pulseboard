import {
  Activity,
  CheckCircle2,
  CircleDashed,
  Clock3,
  FolderKanban,
  ListTodo,
  Target,
  Users,
} from "lucide-react";

export const metricCards = [
  {
    title: "Aktif Proje",
    value: "12",
    change: "+8%",
    description: "Geçen haftaya göre",
    icon: FolderKanban,
  },
  {
    title: "Açık Görev",
    value: "38",
    change: "+12%",
    description: "Sprint içinde",
    icon: ListTodo,
  },
  {
    title: "Yeni Lead",
    value: "9",
    change: "+4%",
    description: "Bu hafta",
    icon: Target,
  },
  {
    title: "Takım Üyesi",
    value: "14",
    change: "+2",
    description: "Aktif kullanıcı",
    icon: Users,
  },
];

export const quickActions = [
  {
    title: "Yeni Proje",
    description: "Workspace için yeni proje oluştur",
    icon: FolderKanban,
  },
  {
    title: "Görev Ekle",
    description: "Sprint veya backlog’a görev ekle",
    icon: ListTodo,
  },
  {
    title: "Lead Oluştur",
    description: "CRM pipeline’a yeni lead ekle",
    icon: Target,
  },
];

export const sprintTasks = [
  {
    title: "Dashboard responsive shell",
    status: "Done",
    icon: CheckCircle2,
  },
  {
    title: "Workspace switcher UI",
    status: "In progress",
    icon: CircleDashed,
  },
  {
    title: "JWT auth endpoint plan",
    status: "Backlog",
    icon: Clock3,
  },
];

export const leadPipeline = [
  { label: "New", count: 12, value: 68, color: "bg-cyan-500" },
  { label: "Qualified", count: 8, value: 52, color: "bg-indigo-500" },
  { label: "Proposal", count: 5, value: 34, color: "bg-amber-500" },
  { label: "Won", count: 3, value: 22, color: "bg-emerald-500" },
];

export const recentTasks = [
  {
    title: "Auth guard polish",
    project: "PulseBoard App",
    priority: "High",
    status: "In progress",
  },
  {
    title: "Landing CTA analytics",
    project: "Marketing",
    priority: "Medium",
    status: "Review",
  },
  {
    title: "Lead empty state design",
    project: "CRM",
    priority: "Low",
    status: "Todo",
  },
  {
    title: "Refresh token strategy",
    project: "Backend API",
    priority: "High",
    status: "Backlog",
  },
];

export const activities = [
  {
    user: "Umut",
    action: "Dashboard layout güncellendi.",
    time: "5 dk önce",
    icon: Activity,
  },
  {
    user: "Demo User",
    action: "Yeni lead pipeline’a eklendi.",
    time: "18 dk önce",
    icon: Target,
  },
  {
    user: "System",
    action: "Workspace ayarları senkronize edildi.",
    time: "1 saat önce",
    icon: CheckCircle2,
  },
];
