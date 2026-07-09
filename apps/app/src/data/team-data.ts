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

export const teamMembers: TeamMember[] = [
  {
    id: "m-1",
    name: "Umut Diyar",
    email: "umut@pulseboard.app",
    role: "Owner",
    status: "Active",
    joinedAt: "Bugün",
  },
  {
    id: "m-2",
    name: "Demo User",
    email: "demo@pulseboard.app",
    role: "Admin",
    status: "Active",
    joinedAt: "2 gün önce",
  },
  {
    id: "m-3",
    name: "Ayşe Demir",
    email: "ayse@example.com",
    role: "Member",
    status: "Pending",
    joinedAt: "Davet bekliyor",
  },
];

export const roleDescriptions = [
  {
    role: "Owner",
    description: "Workspace, billing, üyeler ve tüm proje ayarlarını yönetir.",
  },
  {
    role: "Admin",
    description:
      "Projeleri, görevleri, lead pipeline ve ekip üyelerini yönetebilir.",
  },
  {
    role: "Member",
    description:
      "Kendisine atanan görevleri ve paylaşılan projeleri görüntüler.",
  },
];
