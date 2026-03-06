"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export function Hero() {
  const appBase = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";
  const registerUrl = new URL("/register", appBase).toString();

  return (
    <section className="relative overflow-hidden">
      {/* soft background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(56,189,248,0.16),transparent_55%),radial-gradient(900px_circle_at_60%_90%,rgba(16,185,129,0.14),transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-18 pt-14 md:pb-24 md:pt-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-10 md:grid-cols-2 md:items-center"
        >
          <div className="space-y-6">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs text-black/70 ring-1 ring-black/10"
            >
              <Sparkles size={14} />
              Gerçek bir SaaS projesi: Marketing + Panel + API
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl font-semibold tracking-tight text-black md:text-5xl"
            >
              Ekibin için modern
              <span className="block text-black/70">
                workspace tabanlı yönetim paneli
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-base leading-relaxed text-black/70"
            >
              PulseBoard ile projeleri, görevleri ve müşteri adaylarını tek
              yerde yönet. JWT + рол sistemi, hızlı arayüz ve üretim kalitesinde
              mimariyle.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href={registerUrl}
                className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/90"
              >
                Hesap Oluştur
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center rounded-2xl bg-white/70 px-5 py-3 text-sm font-medium text-black ring-1 ring-black/10 backdrop-blur transition hover:bg-white"
              >
                Planları Gör
              </Link>
            </motion.div>

            <motion.ul
              variants={item}
              className="grid gap-2 text-sm text-black/70"
            >
              {[
                "Workspace + rol yönetimi (Owner/Admin/Member)",
                "JWT + Refresh Token kimlik doğrulama",
                "Hızlı UI: skeleton, empty state, sayfa geçişleri",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-black/5 ring-1 ring-black/10">
                    <Check size={14} />
                  </span>
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* product mock */}
          <motion.div
            initial={{ opacity: 0, y: 18, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-white p-4 ring-1 ring-black/10 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between rounded-2xl bg-black px-4 py-3">
                <div className="text-sm font-medium text-white/90">
                  PulseBoard • Dashboard
                </div>
                <div className="text-xs text-white/70">Canlı</div>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="grid grid-cols-3 gap-3">
                  {["Aktif Proje", "Açık Görev", "Yeni Lead"].map((k) => (
                    <div
                      key={k}
                      className="rounded-2xl bg-black/5 p-4 ring-1 ring-black/10"
                    >
                      <div className="text-xs text-black/60">{k}</div>
                      <div className="mt-2 text-2xl font-semibold text-black">
                        12
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-black/10">
                        <div className="h-2 w-2/3 rounded-full bg-black/40" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-black/5 p-4 ring-1 ring-black/10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-black/90">
                      Bugün
                    </div>
                    <div className="text-xs text-black/60">Sprint 03</div>
                  </div>
                  <div className="mt-3 grid gap-2">
                    {[
                      "Refresh token akışı",
                      "Workspace RBAC",
                      "Marketing sayfası polish",
                    ].map((t) => (
                      <div
                        key={t}
                        className="flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-black/10"
                      >
                        <div className="text-sm text-black/80">{t}</div>
                        <div className="text-xs text-black/60">Devam</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-3xl bg-black/5 blur-xl"
              animate={{ y: [0, -10, 0], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
