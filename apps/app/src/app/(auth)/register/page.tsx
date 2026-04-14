"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthSocialButtons } from "@/components/auth/auth-social-buttons";
import { PasswordField } from "@/components/auth/password-field";
import { PasswordStrength } from "@/components/auth/password-strength";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;

    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1200));
    localStorage.setItem("pb_token", "demo-token");
    window.location.href = "/dashboard";

    setIsLoading(false);
  }

  return (
    <AuthShell mode="register">
      <div className="mb-7">
        <h2 className="mb-1.5 text-[22px] font-bold tracking-[-0.025em] text-gray-900">
          Çalışma alanınızı oluşturun
        </h2>
        <p className="text-sm text-gray-400">
          Zaten hesabınız var mı?{" "}
          <Link
            href="/login"
            className="font-semibold text-gray-900 underline-offset-2 transition-colors hover:underline"
          >
            Giriş yapın →
          </Link>
        </p>
      </div>

      <div className="mb-5">
        <AuthSocialButtons />
      </div>

      <div className="mb-5">
        <AuthDivider />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-600">
              Ad
            </label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Ahmet"
              required
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all focus:border-gray-900 focus:outline-none focus:ring-[3px] focus:ring-gray-900/8"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-gray-600">
              Soyad
            </label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Yılmaz"
              required
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all focus:border-gray-900 focus:outline-none focus:ring-[3px] focus:ring-gray-900/8"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-gray-600">
            İş e-postası
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-300"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="siz@sirket.com"
              required
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all focus:border-gray-900 focus:outline-none focus:ring-[3px] focus:ring-gray-900/8"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-gray-600">
            Şirket / Çalışma alanı adı
          </label>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-300"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>

            <input
              type="text"
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="Acme A.Ş."
              required
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all focus:border-gray-900 focus:outline-none focus:ring-[3px] focus:ring-gray-900/8"
            />
          </div>

          <p className="mt-1.5 flex items-center gap-1 text-[11px] text-gray-400">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            Çalışma alanı URL'si bu isimden oluşturulur. Sonradan
            değiştirilebilir.
          </p>
        </div>

        <div>
          <PasswordField
            label="Şifre"
            value={form.password}
            onChange={(value) => handleChange("password", value)}
            showPassword={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
            placeholder="En az 8 karakter"
          />
          <PasswordStrength password={form.password} />
        </div>

        <label className="group flex cursor-pointer items-start gap-2.5">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-4 w-4 rounded-[4px] border-2 border-gray-300 bg-white transition-all peer-checked:border-gray-900 peer-checked:bg-gray-900" />
            <svg
              className="pointer-events-none absolute left-0.5 top-0.5 h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="text-[12.5px] mt-0.5 leading-snug text-gray-500 transition-colors group-hover:text-gray-700">
            <Link
              href="/terms"
              className="font-semibold text-gray-900 hover:underline"
            >
              Kullanım Koşulları
            </Link>{" "}
            ve{" "}
            <Link
              href="/privacy"
              className="font-semibold text-gray-900 hover:underline"
            >
              Gizlilik Politikası
            </Link>
            'nı okudum ve kabul ediyorum.
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading || !agreed}
          className="group relative mt-0.5 h-11 overflow-hidden rounded-xl cursor-pointer bg-gray-900 text-sm font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span
            className={`flex items-center justify-center gap-2 transition-opacity ${isLoading ? "opacity-0" : "opacity-100"}`}
          >
            Çalışma alanı oluştur
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>

          {isLoading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-4 w-4 animate-spin text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </span>
          )}
        </button>
      </form>

      <p className="pb-6 pt-5 text-center text-[11px] leading-relaxed text-gray-400 lg:pb-0">
        Kredi kartı gerekmez · 14 gün ücretsiz deneme · İstediğiniz zaman iptal
      </p>
    </AuthShell>
  );
}
