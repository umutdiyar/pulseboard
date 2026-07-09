export type LeadStage = "New" | "Qualified" | "Proposal" | "Won";
export type LeadPriority = "Low" | "Medium" | "High";

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  value: string;
  stage: LeadStage;
  priority: LeadPriority;
  owner: string;
  lastContact: string;
};

export type LeadColumn = {
  title: LeadStage;
  description: string;
  leads: Lead[];
};

export const leads: Lead[] = [
  {
    id: "l-1",
    name: "Ayşe Demir",
    company: "NovaTech",
    email: "ayse@novatech.com",
    value: "₺24.000",
    stage: "New",
    priority: "Medium",
    owner: "Umut",
    lastContact: "Bugün",
  },
  {
    id: "l-2",
    name: "Mert Kaya",
    company: "Atlas Studio",
    email: "mert@atlas.studio",
    value: "₺42.000",
    stage: "Qualified",
    priority: "High",
    owner: "Demo User",
    lastContact: "Dün",
  },
  {
    id: "l-3",
    name: "Zeynep Arslan",
    company: "Kite Digital",
    email: "zeynep@kite.digital",
    value: "₺18.500",
    stage: "Proposal",
    priority: "Medium",
    owner: "Umut",
    lastContact: "3 gün önce",
  },
  {
    id: "l-4",
    name: "Can Yıldız",
    company: "Lumen Works",
    email: "can@lumen.works",
    value: "₺65.000",
    stage: "Won",
    priority: "High",
    owner: "Demo User",
    lastContact: "1 hafta önce",
  },
  {
    id: "l-5",
    name: "Ece Şahin",
    company: "Mono Labs",
    email: "ece@monolabs.io",
    value: "₺12.000",
    stage: "New",
    priority: "Low",
    owner: "Umut",
    lastContact: "Bugün",
  },
];

export const leadColumns: LeadColumn[] = [
  {
    title: "New",
    description: "Yeni gelen fırsatlar",
    leads: leads.filter((lead) => lead.stage === "New"),
  },
  {
    title: "Qualified",
    description: "Uygunluğu doğrulananlar",
    leads: leads.filter((lead) => lead.stage === "Qualified"),
  },
  {
    title: "Proposal",
    description: "Teklif aşamasında",
    leads: leads.filter((lead) => lead.stage === "Proposal"),
  },
  {
    title: "Won",
    description: "Kazanılan fırsatlar",
    leads: leads.filter((lead) => lead.stage === "Won"),
  },
];

export const leadSummary = {
  totalValue: "₺161.500",
  totalLeads: leads.length,
  wonDeals: leads.filter((lead) => lead.stage === "Won").length,
  conversionRate: "22%",
};
