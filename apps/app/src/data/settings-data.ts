import {
  Bell,
  CreditCard,
  Database,
  Globe2,
  KeyRound,
  Lock,
  Palette,
  ShieldCheck,
  Trash2,
} from "lucide-react";

export const settingsSections = [
  {
    title: "Çalışma Alanı",
    description: "Workspace bilgileri ve temel ürün ayarları.",
    icon: Database,
  },
  {
    title: "Roller ve Yetkiler",
    description: "Owner, Admin ve Member yetkilerini yönet.",
    icon: ShieldCheck,
  },
  {
    title: "Faturalandırma",
    description: "Plan, kullanım ve faturalandırma ayarları.",
    icon: CreditCard,
  },
  {
    title: "Görünüm",
    description: "Tema ve arayüz tercihleri.",
    icon: Palette,
  },
  {
    title: "Dil ve Bölge",
    description: "Uygulama dili, saat dilimi ve bölge tercihleri.",
    icon: Globe2,
  },
  {
    title: "Bildirimler",
    description: "E-posta ve uygulama bildirimleri.",
    icon: Bell,
  },
  {
    title: "Güvenlik",
    description: "Oturum, şifre ve güvenlik ayarları.",
    icon: Lock,
  },
  {
    title: "API Anahtarları",
    description: "Harici entegrasyonlar için API anahtarları.",
    icon: KeyRound,
  },
  {
    title: "Tehlikeli Bölge",
    description: "Geri alınamaz çalışma alanı işlemleri.",
    icon: Trash2,
    danger: true,
  },
];
