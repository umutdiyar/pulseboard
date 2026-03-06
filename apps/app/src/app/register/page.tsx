import { AuthShell } from "@/components/auth/AuthShell";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Hesap oluştur"
      subtitle="30 saniyede kayıt ol. Sonraki adım deneme onboarding: workspace oluşturma."
      bottomText="Zaten hesabın var mı?"
      bottomHref="/login"
      bottomLabel="Giriş yap"
    >
      <form className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm text-black/70">Ad Soyad</span>
          <input
            type="text"
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:border-black/30"
            placeholder="Umut Diyar Balcı"
            autoComplete="name"
          />
        </label>

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
            autoComplete="new-password"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm text-black/70">Şifre (tekrar)</span>
          <input
            type="password"
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:border-black/30"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </label>

        <label className="mt-1 flex items-start gap-2 text-sm text-black/70">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-black/20"
          />
          <span>
            <span className="font-medium text-black">Kullanım şartlarını</span>{" "}
            kabul ediyorum.
          </span>
        </label>

        <button
          type="button"
          className="mt-2 h-11 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium shadow-[0_18px_50px_-25px_rgba(99,102,241,0.55)] transition hover:brightness-95"
        >
          Hesap oluştur
        </button>
      </form>
    </AuthShell>
  );
}
