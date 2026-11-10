import type { Activity, ActivityEntityType } from "@/types/workspace";

const entityLabels: Record<ActivityEntityType, string> = {
  project: "projeyi",
  task: "görevini",
  lead: "müşteri adayını",
  member: "ekip üyesini",
  sprint: "sprint'i",
};

const activityValueLabels: Record<string, string> = {
  Todo: "Yapılacak",
  "In Progress": "Devam Ediyor",
  Review: "İncelemede",
  Done: "Tamamlandı",

  New: "Yeni",
  Qualified: "Nitelikli",
  Proposal: "Teklif",
  Won: "Kazanıldı",

  Planning: "Planlama",
  Active: "Aktif",
  Paused: "Duraklatıldı",
  Completed: "Tamamlandı",
};

export function getActivityValueLabel(value?: string) {
  if (!value) {
    return "";
  }

  return activityValueLabels[value] ?? value;
}

export function getActivityDescription(activity: Activity) {
  const entityLabel = entityLabels[activity.entityType];

  switch (activity.action) {
    case "created":
      return `"${activity.entityName}" ${entityLabel} oluşturdu.`;

    case "status_changed": {
      const from = getActivityValueLabel(activity.metadata?.from);

      const to = getActivityValueLabel(activity.metadata?.to);

      if (!from || !to) {
        return `"${activity.entityName}" durumunu güncelledi.`;
      }

      return `"${activity.entityName}" ${entityLabel} "${from}" durumundan "${to}" durumuna taşıdı.`;
    }

    case "invited":
      return `"${activity.entityName}" kullanıcısını çalışma alanına davet etti.`;

    default:
      return `"${activity.entityName}" üzerinde işlem yaptı.`;
  }
}

export function formatRelativeTime(createdAt: string) {
  const date = new Date(createdAt);
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) {
    return "Az önce";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} dk önce`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} sa önce`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} gün önce`;
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
