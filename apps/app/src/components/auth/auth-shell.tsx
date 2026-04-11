import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  mode: "login" | "register";
  children: ReactNode;
};

export function AuthShell({ mode, children }: AuthShellProps) {
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen flex">
      <div
        className={`relative hidden overflow-hidden lg:flex ${
          isLogin ? "lg:w-[52%] xl:w-[55%]" : "lg:w-[46%] xl:w-[48%]"
        } flex-col bg-[#080808]`}
      >
        <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/8 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-emerald-500/6 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[450px] w-[450px] rounded-full bg-indigo-500/7 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between px-10 pt-10">
          <Link
            href="http://localhost:3000"
            className="flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-white shadow-lg">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M9.5 2L4 9h4.5L6.5 14L12 7H7.5L9.5 2Z"
                  fill="#080808"
                />
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">
              PulseBoard
            </span>
          </Link>

          {isLogin ? (
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-white/30">
                Tüm sistemler çalışıyor
              </span>
            </div>
          ) : null}
        </div>

        {isLogin ? (
          <>
            <div className="relative z-10 flex flex-1 flex-col justify-center px-10 pb-10 xl:px-16">
              <div className="max-w-md">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-3.5 py-1.5">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-white/40">
                    Şu an aktif
                  </span>
                  <span className="text-[11px] font-semibold text-white/60">
                    1.200+ ekip
                  </span>
                </div>

                <h1 className="mb-5 text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-white xl:text-[44px]">
                  Ekibinizin nabzını
                  <br />
                  <span className="text-white/40">her an hissedin</span>
                </h1>

                <p className="mb-12 text-[15px] leading-relaxed text-white/35">
                  PulseBoard ile projelerinizi, görevlerinizi ve ekip
                  iletişiminizi tek bir gerçek zamanlı panelde yönetin.
                </p>

                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
                  <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    </div>
                    <span className="mx-auto text-[11px] font-medium text-white/20">
                      PulseBoard · Dashboard
                    </span>
                    <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      Canlı
                    </span>
                  </div>

                  <div className="mb-3 grid grid-cols-3 gap-3 p-4">
                    {[
                      { label: "Aktif Proje", value: "12" },
                      { label: "Açık Görev", value: "38" },
                      { label: "Sprint", value: "03" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-white/[0.05] bg-white/[0.04] p-3"
                      >
                        <p className="mb-1.5 text-[10px] text-white/30">
                          {stat.label}
                        </p>
                        <p className="text-xl font-bold leading-none text-white">
                          {stat.value}
                        </p>
                        <div className="mt-2 h-0.5 rounded-full bg-white/[0.06]">
                          <div className="h-full w-2/3 rounded-full bg-white/20" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 px-4 pb-4">
                    {[
                      "Refresh token akışı",
                      "Workspace RBAC",
                      "Marketing sayfası polish",
                    ].map((task, i) => (
                      <div
                        key={task}
                        className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.03] px-3 py-2"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-amber-400" : "bg-white/20"}`}
                          />
                          <span className="text-xs text-white/50">{task}</span>
                        </div>
                        <span className="text-[10px] text-white/20">Devam</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 px-10 pb-10 xl:px-16">
              <div className="flex items-center gap-8 border-t border-white/[0.06] pt-6">
                {[
                  { value: "99.9%", label: "Uptime SLA" },
                  { value: "4.9★", label: "Ortalama puan" },
                  { value: "<50ms", label: "Gecikme süresi" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-sm font-bold text-white">{s.value}</p>
                    <p className="mt-0.5 text-[11px] text-white/25">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-emerald-500/8 blur-3xl" />
            <div className="pointer-events-none absolute top-1/2 -left-24 h-[360px] w-[360px] rounded-full bg-blue-400/6 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-1/4 h-[380px] w-[380px] rounded-full bg-violet-500/6 blur-3xl" />

            <div className="relative z-10 flex flex-1 flex-col justify-center px-10 pb-6 xl:px-14">
              <div className="max-w-[340px]">
                <div className="mb-8">
                  <span className="text-xs font-medium uppercase tracking-widest text-white/25">
                    Neden PulseBoard?
                  </span>
                </div>

                <h1 className="mb-5 text-3xl font-bold leading-[1.18] tracking-[-0.03em] text-white xl:text-4xl">
                  Projenizi değil,
                  <br />
                  <span className="text-white/35">hedefinizi yönetin</span>
                </h1>

                <p className="mb-10 text-sm leading-relaxed text-white/30">
                  Rol bazlı görünümler, gerçek zamanlı güncellemeler ve sıfır
                  öğrenme eğrisiyle ekibinizi ilk günden verimli yapın.
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      icon: "⚡",
                      title: "5 dakikada kurulum",
                      desc: "Ekibinizi davet edin, projeler oluşturun, hemen başlayın.",
                    },
                    {
                      icon: "🎯",
                      title: "Rol bazlı paneller",
                      desc: "CEO, Yönetici ve Üye için özel tasarlanmış görünümler.",
                    },
                    {
                      icon: "🔒",
                      title: "JWT + Refresh Token güvenliği",
                      desc: "Kurumsal düzeyde kimlik doğrulama, kutudan çıkar çıkmaz.",
                    },
                  ].map((f) => (
                    <div key={f.title} className="flex gap-3.5">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.05] text-base">
                        {f.icon}
                      </div>
                      <div>
                        <p className="mb-0.5 text-[13px] font-semibold text-white/70">
                          {f.title}
                        </p>
                        <p className="text-[12px] leading-snug text-white/25">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 mx-10 mb-10 xl:mx-14">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm">
                <div className="mb-3 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#f59e0b"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p className="mb-3 text-[12.5px] leading-relaxed text-white/40">
                  "Haftalık durum toplantılarımızı tamamen kaldırdık. PulseBoard
                  sayesinde herkes ne yapması gerektiğini biliyor."
                </p>

                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 text-[10px] font-bold text-white">
                    AK
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-white/50">
                      Adem K.
                    </p>
                    <p className="text-[10px] text-white/20">CTO, Novastruct</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-y-auto bg-[#fafafa] px-4 py-10 sm:px-6 lg:py-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-blue-50/20" />

        <div className="lg:hidden absolute left-6 top-6">
          <Link
            href="http://localhost:3000"
            className="flex items-center gap-2"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#080808]">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M9.5 2L4 9h4.5L6.5 14L12 7H7.5L9.5 2Z" fill="white" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
              PulseBoard
            </span>
          </Link>
        </div>

        <div className="relative w-full max-w-[540px]">{children}</div>
      </div>
    </div>
  );
}
