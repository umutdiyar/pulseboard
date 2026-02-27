"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const links = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Docs", href: "/docs" },
  { name: "Changelog", href: "/changelog" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
            ⚡
          </span>
          <span className="font-semibold tracking-tight text-white">
            PulseBoard
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {l.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001"}
            className="hidden rounded-xl px-3 py-2 text-sm ring-1ring-white/15 transition hover:bg-white/10 hover:text-white md:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href={
              (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001") +
              "/register"
            }
            className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Start free <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
