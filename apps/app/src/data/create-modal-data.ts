import type { CreateModalType } from "@/store/modal-store";

type ModalConfiguration = {
  title: string;
  description: string;
  submitLabel: string;
};

export const createModalConfig: Record<
  Exclude<CreateModalType, null>,
  ModalConfiguration
> = {
  project: {
    title: "Yeni proje oluştur",
    description:
      "Çalışma alanı için yeni bir proje oluştur ve ekibinle çalışmaya başla.",
    submitLabel: "Projeyi oluştur",
  },

  task: {
    title: "Yeni görev oluştur",
    description: "Bir projeye veya mevcut sprint'e yeni bir görev ekle.",
    submitLabel: "Görevi oluştur",
  },

  lead: {
    title: "Yeni müşteri adayı",
    description: "CRM pipeline'a yeni bir müşteri adayı ve fırsat kaydı ekle.",
    submitLabel: "Müşteri adayı oluştur",
  },

  member: {
    title: "Ekip üyesi davet et",
    description:
      "E-posta adresi üzerinden çalışma alanına yeni bir üye davet et.",
    submitLabel: "Daveti gönder",
  },
};
