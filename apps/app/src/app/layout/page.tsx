"use client";

import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    const token = localStorage.getItem("pb_token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-[#f8fafc]">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Aktif Proje", "12"],
            ["Açık Görev", "38"],
            ["Lead", "9"],
          ].map(([title, value]) => (
            <div
              key={title}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-sm text-gray-500">{title}</p>
              <p className="mt-2 text-2xl font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("pb_token");
            window.location.href = "/login";
          }}
          className="mt-6 rounded-xl bg-black px-4 py-2 text-white"
        >
          Çıkış yap
        </button>
      </div>
    </div>
  );
}
