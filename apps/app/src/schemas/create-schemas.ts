import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Proje adı en az 3 karakter olmalıdır.")
    .max(80, "Proje adı en fazla 80 karakter olabilir."),

  description: z
    .string()
    .trim()
    .min(10, "Açıklama en az 10 karakter olmalıdır.")
    .max(500, "Açıklama en fazla 500 karakter olabilir."),

  status: z.enum(["Planning", "Active", "Paused", "Completed"]),

  owner: z.string().min(1, "Proje sahibi seçmelisiniz."),

  dueDate: z.string().min(1, "Bitiş tarihi seçmelisiniz."),
});

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Görev başlığı en az 3 karakter olmalıdır.")
    .max(120, "Görev başlığı en fazla 120 karakter olabilir."),

  description: z
    .string()
    .trim()
    .max(500, "Açıklama en fazla 500 karakter olabilir."),

  project: z.string().min(1, "Proje seçmelisiniz."),

  status: z.enum(["Todo", "In Progress", "Review", "Done"]),

  priority: z.enum(["Low", "Medium", "High"]),

  assignee: z.string().min(1, "Atanan kişiyi seçmelisiniz."),

  dueDate: z.string().min(1, "Bitiş tarihi seçmelisiniz."),
});

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalıdır."),

  company: z.string().trim().min(2, "Şirket adı en az 2 karakter olmalıdır."),

  email: z.string().trim().email("Geçerli bir e-posta adresi girin."),

  value: z.coerce.number().min(0, "Tahmini değer negatif olamaz."),

  stage: z.enum(["New", "Qualified", "Proposal", "Won"]),

  priority: z.enum(["Low", "Medium", "High"]),

  owner: z.string().min(1, "Sorumlu kişi seçmelisiniz."),

  notes: z.string().trim().max(1000, "Notlar en fazla 1000 karakter olabilir."),
});

export const memberSchema = z.object({
  email: z.string().trim().email("Geçerli bir e-posta adresi girin."),

  role: z.enum(["Admin", "Member"]),

  message: z
    .string()
    .trim()
    .max(500, "Davet mesajı en fazla 500 karakter olabilir."),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export type TaskFormValues = z.infer<typeof taskSchema>;

export type LeadFormValues = z.infer<typeof leadSchema>;

export type MemberFormValues = z.infer<typeof memberSchema>;
