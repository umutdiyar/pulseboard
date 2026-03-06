import { AuthShell } from "@/components/auth/AuthShell";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthShell
      title="Giriş"
      subtitle="Hesabına giriş yap. Sonraki adımda gerçek JWT + refresh token bağlayacağız."
      bottomText="Hesabın yok mu?"
      bottomHref="/register"
      bottomLabel="Kayıt ol"
    >
      <form className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm text-black/70">E-posta</span>
          <input
            type="email"
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:border-black/30"
            placeholder="ornek@mail.com"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm text-black/70">Şifre</span>
          <input
            type="password"
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:border-black/30"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </label>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-sm text-black/70">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-black/20"
            />
            Beni hatırla
          </label>
          <Link href="#" className="text-sm text-black/60 hover:text-black">
            Şifremi unuttum
          </Link>
        </div>

        <button
          type="button"
          className="mt-2 h-11 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium shadow-[0_18px_50px_-25px_rgba(99,102,241,0.55)] transition hover:brightness-95"
        >
          Giriş yap
        </button>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-px flex-1 bg-black/10" />
          <div className="text-xs text-black/50">veya</div>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        <button
          type="button"
          className="h-11 rounded-2xl bg-white text-black font-medium ring-1 ring-black/10 transition hover:bg-black/5"
        >
          Google ile devam et (yakında)
        </button>
      </form>
    </AuthShell>
  );
}
