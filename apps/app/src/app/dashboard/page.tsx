"use client";

import { useRequireAuth } from "@/lib/auth/auth-guard";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { canRenderProtected } = useRequireAuth("/login");
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  if (!canRenderProtected) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="text-sm text-gray-500">Dashboard yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[#f8fafc]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Hoş Geldiniz</p>
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.name ?? "Admin User"}
            </h1>
          </div>

          <button
            onClick={() => {
              logout();
              router.replace("/login");
            }}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Çıkış yap
          </button>
        </div>

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
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
