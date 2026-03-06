"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const links = [
  { href: "#features", label: "Özellikler" },
  { href: "#how-to-open", label: "Nasıl Çalışır?" },
  { href: "#pricing", label: "Fiyatlandırma" },
  { href: "#sss", label: "SSS" },
];

export function Navbar() {
  const appBase = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001";
  const signInUrl = new URL("/login", appBase).toString();
  const registerUrl = new URL("/register", appBase).toString();

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-black text-white">
            ⚡
          </span>
          <span className="font-semibold tracking-tight text-black">
            PulseBoard
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-black/70 transition hover:text-black"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={signInUrl}
            className="hidden rounded-xl px-3 py-2 text-sm text-black/70 ring-1 ring-black/10 transition hover:bg-black/5 hover:text-black md:inline-flex"
          >
            Giriş
          </Link>
          <Link
            href={registerUrl}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-3 py-2 text-sm font-medium text-white transition hover:bg-black/90"
          >
            Ücretsiz Başla <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
