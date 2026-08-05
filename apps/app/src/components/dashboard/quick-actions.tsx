"use client";

import { motion } from "framer-motion";
import { quickActions } from "@/data/dashboard-data";

import { useModalStore } from "@/store/modal-store";

const modalTypes = {
  "Yeni Proje": "project",
  "Görev Ekle": "task",
  "Lead Oluştur": "lead",
} as const;

export function QuickActions() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {quickActions.map((action, index) => {
        const Icon = action.icon;

        const modalType = modalTypes[action.title as keyof typeof modalTypes];

        return (
          <motion.button
            key={action.title}
            type="button"
            onClick={() => openModal(modalType)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white transition group-hover:scale-105">
                <Icon size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {action.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {action.description}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </section>
  );
}
