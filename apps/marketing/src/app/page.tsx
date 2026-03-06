import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { SectionReveal } from "@/components/site/SectionReveal";

const features = [
  {
    title: "Workspace tabanlı yapı",
    desc: "Her ekip ayrı workspace. Üyelik ve rol yönetimi (Owner/Admin/Member) ile güvenli kullanım.",
  },
  {
    title: "Üretim kalitesinde auth",
    desc: "JWT + Refresh Token akışı. Güvenli oturum yönetimi ve token yenileme.",
  },
  {
    title: "Hızlı panel deneyimi",
    desc: "Caching, skeleton loading, empty state ve sayfa geçişleri ile akıcı UI.",
  },
  {
    title: "Projeler & görevler",
    desc: "Sprint mantığıyla görev yönetimi. Filtreleme, arama, durum akışı.",
  },
  {
    title: "Mini CRM (Lead)",
    desc: "Müşteri adaylarını topla, etiketle, pipeline şeklinde takip et.",
  },
  {
    title: "Deploy-ready kurulum",
    desc: "Docker + env yönetimi. CI/CD’ye uygun repo düzeni.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Ücretsiz",
    desc: "Kişisel kullanım ve demo için.",
    items: ["1 workspace", "Temel görev yönetimi", "Sınırlı metrikler"],
  },
  {
    name: "Pro",
    price: "₺199/ay",
    desc: "Küçük ekipler için ideal.",
    items: [
      "5 workspace üyesi",
      "Gelişmiş filtreleme",
      "Lead pipeline",
      "Öncelikli destek",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: "₺499/ay",
    desc: "Daha fazla kontrol ve ölçek.",
    items: [
      "Sınırsız üye",
      "Rol & izin yönetimi",
      "Audit log (yakında)",
      "SLA destek",
    ],
  },
];

const faqs = [
  {
    q: "Bu gerçekten production seviyesinde bir SaaS mimarisi mi?",
    a: "Evet. Multi-tenant (workspace) yapısı, rol bazlı yetkilendirme, güvenli kimlik doğrulama ve ölçeklenebilir API mimarisi ile gerçek SaaS projeleri için tasarlandı.",
  },
  {
    q: "Panel ve API birbirinden bağımsız mı?",
    a: "Evet. Next.js ile geliştirilen yönetim paneli ve .NET tabanlı API ayrı servislerdir. Bu sayede bağımsız deploy edilebilir ve ihtiyaç halinde ayrı ayrı ölçeklenebilir.",
  },
  {
    q: "Projeye ödeme sistemi entegre edilebilir mi?",
    a: "Evet. Fiyatlandırma planları ve abonelik mantısı hazır olacak şekilde tasarlandı. Stripe veya benzeri bir ödeme sistemi kolayca entegre edilebilir.",
  },
  {
    q: "Bu sistemi kendi projem için özelleştirebilir miyim?",
    a: "Evet. Modüler mimari sayesinde yeni özellikler ekleyebilir, yetkilendirme yapısını genişletebilir ve sistemi kendi SaaS ürününüze göre uyarlayabilirsiniz.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <Hero />

      <main className="mx-auto max-w-6xl px-4 pb-24">
        {/* Logo strip */}
        <SectionReveal>
          <section className="py-10">
            <p className="text-center text-sm text-black/60">
              Kullanan ekipler (demo)
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-3xl bg-black/5 p-6 ring-1 ring-black/10 sm:grid-cols-4">
              {["Nova", "Atlas", "Kite", "Lumen"].map((b) => (
                <div
                  key={b}
                  className="flex items-center justify-center rounded-2xl bg-white py-4 ring-1 ring-black/10"
                >
                  <span className="text-sm font-semibold text-black/70">
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* Features */}
        <section id="features" className="scroll-mt-24 py-10">
          <SectionReveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Özellikler
                </h2>
                <p className="mt-2 text-black/70">
                  Sadece “CRUD” değil. Gerçek ürün hissi veren detaylar: auth,
                  roller, performans ve deploy.
                </p>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {features.map((f, idx) => (
              <SectionReveal key={f.title} delay={idx * 0.05}>
                <div className="rounded-3xl bg-white p-6 ring-1 ring-black/10 shadow-sm">
                  <div className="text-lg font-semibold">{f.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">
                    {f.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-to-open" className="scroll-mt-24 py-10">
          <SectionReveal>
            <h2 className="text-2xl font-semibold tracking-tight">
              Nasıl çalışır?
            </h2>
            <p className="mt-2 text-black/70">
              3 adımda kur, ekibini davet et, işlerini yönet.
            </p>
          </SectionReveal>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Workspace oluştur",
                d: "Kayıt ol ve ilk workspace’ini aç.",
              },
              {
                t: "Ekip üyelerini davet et",
                d: "Rol ver: Owner/Admin/Member.",
              },
              {
                t: "Proje & görev akışını kur",
                d: "Sprint planla, görevleri takip et.",
              },
            ].map((s, idx) => (
              <SectionReveal key={s.t} delay={idx * 0.06}>
                <div className="rounded-3xl bg-white/80 p-6 ring-1 ring-black/10 backdrop-blur shadow-sm">
                  <div className="text-sm text-black/70 font-extrabold">
                    0{idx + 1}
                  </div>
                  <div className="mt-2 text-lg font-semibold">{s.t}</div>
                  <p className="mt-2 text-sm text-black/70">{s.d}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* Screenshot section */}
        {/* Panel preview */}
        <section className="py-10">
          <SectionReveal>
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-black/10">
              {/* gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-fuchsia-100" />
              <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)] bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />

              <div className="relative p-8 md:p-10">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Panel önizleme
                    </h2>
                    <p className="mt-2 text-black/70">
                      Dashboard metrikleri, projeler, görevler ve lead pipeline.
                      Gerçek ürün hissi için mikro etkileşimler + animasyon.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs text-black/70 ring-1 ring-black/10 backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Live preview (mock)
                  </div>
                </div>

                {/* mock window */}
                <div className="mt-8 rounded-3xl bg-white/70 p-4 ring-1 ring-black/10 backdrop-blur shadow-[0_30px_80px_-50px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-black/10">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400" />
                      <span className="ml-3 text-sm font-medium text-black/80">
                        PulseBoard • Dashboard
                      </span>
                    </div>
                    <div className="text-xs text-black/60">Workspace: Nova</div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-12">
                    {/* left nav */}
                    <div className="md:col-span-3">
                      <div className="rounded-2xl bg-white p-4 ring-1 ring-black/10">
                        <div className="text-xs font-semibold text-black/60">
                          MENÜ
                        </div>
                        <div className="mt-3 grid gap-2 text-sm">
                          {[
                            "Dashboard",
                            "Projects",
                            "Tasks",
                            "Leads",
                            "Settings",
                          ].map((i, idx) => (
                            <div
                              key={i}
                              className={[
                                "rounded-xl px-3 py-2 ring-1",
                                idx === 0
                                  ? "bg-gradient-to-r from-sky-50 to-fuchsia-50 ring-black/10"
                                  : "bg-white ring-black/10 text-black/70",
                              ].join(" ")}
                            >
                              {i}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* main */}
                    <div className="md:col-span-9">
                      <div className="grid gap-4">
                        {/* stats */}
                        <div className="grid gap-4 md:grid-cols-3">
                          {[
                            {
                              k: "Aktif Proje",
                              v: "12",
                              g: "from-sky-500/15 to-sky-200/10",
                            },
                            {
                              k: "Açık Görev",
                              v: "38",
                              g: "from-fuchsia-500/15 to-fuchsia-200/10",
                            },
                            {
                              k: "Yeni Lead",
                              v: "7",
                              g: "from-emerald-500/15 to-emerald-200/10",
                            },
                          ].map((c) => (
                            <div
                              key={c.k}
                              className="rounded-2xl bg-white p-4 ring-1 ring-black/10"
                            >
                              <div className="text-xs text-black/60">{c.k}</div>
                              <div className="mt-2 text-2xl font-semibold">
                                {c.v}
                              </div>
                              <div className="mt-3 h-2 w-full rounded-full bg-black/10">
                                <div
                                  className={`h-2 w-2/3 rounded-full bg-gradient-to-r ${c.g}`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* content blocks */}
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="rounded-2xl bg-white p-5 ring-1 ring-black/10">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-semibold text-black/80">
                                Bugün
                              </div>
                              <div className="text-xs text-black/60">
                                Sprint 03
                              </div>
                            </div>
                            <div className="mt-3 grid gap-2">
                              {[
                                {
                                  t: "Refresh token akışı",
                                  s: "Devam",
                                  pill: "bg-sky-100 text-sky-700",
                                },
                                {
                                  t: "Workspace RBAC",
                                  s: "Planlandı",
                                  pill: "bg-fuchsia-100 text-fuchsia-700",
                                },
                                {
                                  t: "UI polish",
                                  s: "Devam",
                                  pill: "bg-emerald-100 text-emerald-700",
                                },
                              ].map((x) => (
                                <div
                                  key={x.t}
                                  className="flex items-center justify-between rounded-xl bg-black/5 px-3 py-2 ring-1 ring-black/10"
                                >
                                  <div className="text-sm text-black/75">
                                    {x.t}
                                  </div>
                                  <span
                                    className={`rounded-full px-2 py-1 text-[11px] font-medium ${x.pill}`}
                                  >
                                    {x.s}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-2xl bg-white p-5 ring-1 ring-black/10">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-semibold text-black/80">
                                Lead Pipeline
                              </div>
                              <div className="text-xs text-black/60">
                                Bu hafta
                              </div>
                            </div>
                            <div className="mt-4 grid gap-2">
                              {[
                                { k: "Yeni", w: "w-3/5", c: "bg-sky-300" },
                                {
                                  k: "Görüşme",
                                  w: "w-2/5",
                                  c: "bg-fuchsia-300",
                                },
                                {
                                  k: "Teklif",
                                  w: "w-1/3",
                                  c: "bg-emerald-300",
                                },
                              ].map((p) => (
                                <div key={p.k}>
                                  <div className="flex justify-between text-xs text-black/60">
                                    <span>{p.k}</span>
                                    <span>—</span>
                                  </div>
                                  <div className="mt-1 h-2 rounded-full bg-black/10">
                                    <div
                                      className={`h-2 ${p.w} rounded-full ${p.c}`}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-black/60">
                  Not: Bu bölüm marketing için mock. Panel tarafında gerçek
                  veriler, skeleton loading ve sayfa geçişleriyle birebir üretim
                  kalitesi kuracağız.
                </p>
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-24 py-10">
          <SectionReveal>
            <h2 className="text-2xl font-semibold tracking-tight">
              Fiyatlandırma
            </h2>
            <p className="mt-2 text-black/70">
              Demo fiyatlar. Ama ürün mantığı gerçek: plan + yetki + limit.
            </p>
          </SectionReveal>

          <div className="mt-6 grid gap-4 md:grid-cols-3 items-stretch">
            {plans.map((p, idx) => (
              <SectionReveal key={p.name} delay={idx * 0.06}>
                <div
                  className={[
                    "h-full rounded-3xl p-6 ring-1 shadow-sm",
                    "flex flex-col", // CTA'yı alta itmek için
                    p.highlighted
                      ? "bg-black text-white ring-black"
                      : "bg-white text-black ring-black/10",
                  ].join(" ")}
                >
                  <div className="text-sm opacity-80">{p.name}</div>

                  <div className="mt-2 text-3xl font-semibold">{p.price}</div>

                  <p className="mt-2 text-sm opacity-80">{p.desc}</p>

                  <ul className="mt-5 grid gap-2 text-sm mb-5">
                    {p.items.map((i) => (
                      <li key={i} className="opacity-90">
                        • {i}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={
                      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001"
                    }
                    className={[
                      "mt-auto", // en alta sabitle
                      "inline-flex w-full justify-center rounded-2xl px-4 py-3 text-sm font-medium transition hover:shadow-lg",
                      p.highlighted
                        ? "bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white ring-black/10"
                        : "bg-white font-medium ring-1 backdrop-blur transition ring-black/10 text-black",
                    ].join(" ")}
                  >
                    Başla
                  </a>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="sss" className="scroll-mt-24 py-10">
          <SectionReveal>
            <h2 className="text-2xl font-semibold tracking-tight">SSS</h2>
            <p className="mt-2 text-black/70">Sık sorulanlar.</p>
          </SectionReveal>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((f, idx) => (
              <SectionReveal key={f.q} delay={idx * 0.05}>
                <div className="rounded-3xl bg-white p-6 ring-1 ring-black/10 shadow-sm">
                  <div className="font-semibold">{f.q}</div>
                  <p className="mt-2 text-sm leading-relaxed text-black/70">
                    {f.a}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <SectionReveal>
          <section className="py-10">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-10 text-white shadow-[0_30px_80px_-55px_rgba(99,102,241,0.55)]">
              {" "}
              <h3 className="text-2xl font-semibold">
                Hadi gerçek bir SaaS projesi çıkaralım.
              </h3>
              <p className="mt-2 text-white/70">
                Bir sonraki adım: Panel UI (shadcn) + Auth (JWT/Refresh) +
                Workspace onboarding.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={new URL(
                    "/register",
                    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001",
                  ).toString()}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90"
                >
                  Ücretsiz Başla
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-2xl bg-white/15 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20"
                >
                  Özelliklere dön
                </a>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Footer */}
        <footer className="border-t border-black/10 py-10 text-sm text-black/60">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} PulseBoard</div>
            <div className="flex gap-4">
              <a className="hover:text-black" href="#pricing">
                Fiyatlandırma
              </a>
              <a className="hover:text-black" href="#sss">
                SSS
              </a>
              <a className="hover:text-black" href="#features">
                Özellikler
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
