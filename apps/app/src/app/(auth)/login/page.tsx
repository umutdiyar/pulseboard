"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthSocialButtons } from "@/components/auth/auth-social-buttons";
import { PasswordField } from "@/components/auth/password-field";
import { useRedirectIfAuthenticated } from "@/lib/auth/auth-guard";
import { DEMO_CREDENTIALS } from "@/lib/auth/auth-config";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { hydrated } = useRedirectIfAuthenticated("/dashboard");

  const login = useAuthStore((s) => s.login);
  const loginAsDemo = useAuthStore((s) => s.loginAsDemo);

  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    setIsLoading(false);

    if (!result.success) {
      setError(result.message ?? "Giriş başarısız.");
      return;
    }

    router.replace("/dashboard");
  }

  function handleDemoLogin() {
    loginAsDemo();
    router.replace("/dashboard");
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <div className="text-sm text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <AuthShell mode="login">
      <div className="mb-8">
        <h2 className="mb-1.5 text-2xl font-bold tracking-[-0.025em] text-gray-900">
          Tekrar hoş geldiniz
        </h2>
        <p className="text-sm text-gray-400">
          Hesabınız yok mu?{" "}
          <Link
            href="/register"
            className="font-semibold text-gray-900 underline-offset-2 transition-colors hover:underline"
          >
            Ücretsiz başlayın →
          </Link>
        </p>
      </div>

      <div className="mb-4 rounded-xl border border-blue-100 py-3 text-[12px] text-blue-700 bg-blue-50 px-4">
        Demo girişi için e-posta: <strong>{DEMO_CREDENTIALS.email}</strong>
        <br />
        Şifre: <strong>{DEMO_CREDENTIALS.password}</strong>
      </div>

      <div className="mb-6">
        <AuthSocialButtons />
      </div>

      <div className="mb-6">
        <AuthDivider text="veya e-posta ile devam edin" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-gray-600">
            İş e-postası
          </label>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
              <svg
                width="15"
                height="15"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="siz@sirket.com"
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all focus:border-gray-900 focus:outline-none focus:ring-[3px] focus:ring-gray-900/8"
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-[13px] font-semibold text-gray-600">
              Şifre
            </label>
            <Link
              href="/forgot-password"
              className="text-[12px] text-gray-400 transition-colors hover:text-gray-600"
            >
              Şifreni mi unuttun?
            </Link>
          </div>

          <PasswordField
            label=""
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
          />
        </div>

        <label className="group flex cursor-pointer items-center gap-2.5">
          <div className="relative">
            <input type="checkbox" defaultChecked className="peer sr-only" />
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
          <span className="text-[13px] text-gray-500 transition-colors group-hover:text-gray-700">
            Beni oturumda açık tut
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative mt-1 h-11 overflow-hidden rounded-xl bg-gray-900 text-sm font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-70"
        >
          <span
            className={`flex items-center justify-center gap-2 transition-opacity cursor-pointer ${isLoading ? "opacity-0" : "opacity-100"}`}
          >
            Giriş yap
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

        <button
          type="button"
          onClick={handleDemoLogin}
          className="h-11 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Demo kullanıcı ile giriş yap
        </button>
      </form>

      <p className="mt-6 text-center text-[11.5px] leading-relaxed text-gray-400">
        Bu formu kullanarak{" "}
        <Link
          href="/terms"
          className="underline underline-offset-2 transition-colors hover:text-gray-600"
        >
          Kullanım Koşulları
        </Link>{" "}
        ve{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-2 transition-colors hover:text-gray-600"
        >
          Gizlilik Politikası
        </Link>
        'nı kabul etmiş olursunuz.
      </p>
    </AuthShell>
  );
}
