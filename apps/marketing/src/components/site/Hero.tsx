"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export function Hero() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";

  return (
    <section className="relative overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[-120px] top-[120px] h-[360px] w-[360px] rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 md:pb-28 md:pt-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-10 md:grid-cols-2 md:items-center"
        >
          <div className="space-y-6">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/15"
            >
              <Sparkles size={14} />
              Multi-tenant SaaS dashboard template
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl font-semibold tracking-tight text-white md:text-5xl"
            >
              Ship a real SaaS:
              <span className="block text-white/80">
                Marketing site + Panel + API
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-base leading-relaxed text-white/70"
            >
              PulseBoard is a modern workspace-based product: auth, roles,
              projects, tasks, metrics, and deployment-ready setup. Built to
              look and feel like a production app.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href={`${appUrl}/register`}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Create account
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/15 transition hover:bg-white/15"
              >
                See features
              </Link>
            </motion.div>

            <motion.ul
              variants={item}
              className="grid gap-2 text-sm text-white/70"
            >
              {[
                "Workspaces + roles (Owner/Admin/Member)",
                "JWT + Refresh Token auth flow",
                "Fast UI: skeletons, empty states, transitions",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    <Check size={14} />
                  </span>
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* “product mock” */}
          <motion.div
            initial={{ opacity: 0, y: 18, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-white/5 p-4 ring-1 ring-white/15">
              <div className="flex items-center justify-between rounded-2xl bg-black/40 px-4 py-3 ring-1 ring-white/10">
                <div className="text-sm font-medium text-white/90">
                  PulseBoard • Dashboard
                </div>
                <div className="text-xs text-white/60">Live</div>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="grid grid-cols-3 gap-3">
                  {["Active Projects", "Open Tasks", "New Leads"].map((k) => (
                    <div
                      key={k}
                      className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                    >
                      <div className="text-xs text-white/60">{k}</div>
                      <div className="mt-2 text-2xl font-semibold text-white">
                        12
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                        <div className="h-2 w-2/3 rounded-full bg-white/40" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-white/90">
                      Today
                    </div>
                    <div className="text-xs text-white/60">Sprint 03</div>
                  </div>
                  <div className="mt-3 grid gap-2">
                    {[
                      "Auth refresh token flow",
                      "Workspace RBAC middleware",
                      "Marketing animations polish",
                    ].map((t) => (
                      <div
                        key={t}
                        className="flex items-center justify-between rounded-xl bg-black/30 px-3 py-2 ring-1 ring-white/10"
                      >
                        <div className="text-sm text-white/80">{t}</div>
                        <div className="text-xs text-white/60">In progress</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* subtle floating */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-3xl bg-white/10 blur-xl"
              animate={{ y: [0, -10, 0], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
