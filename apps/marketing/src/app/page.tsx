import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { SectionReveal } from "@/components/site/SectionReveal";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />

      <main className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Real SaaS structure",
              desc: "Marketing + App + API with workspace-based access.",
            },
            {
              title: "Modern UI & motion",
              desc: "Framer Motion, smooth reveal sections, production-like layout.",
            },
            {
              title: "Deploy-ready",
              desc: "Docker, env config, CI-ready repo structure.",
            },
          ].map((c, idx) => (
            <SectionReveal key={c.title} delay={idx * 0.05}>
              <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="text-lg font-semibold">{c.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {c.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.15}>
          <div className="mt-10 rounded-3xl p-8 ring-1 bg-white/5 ring-white/10">
            <div className="text-2xl font-semibold">Next up</div>
            <p className="mt-2 text-white/70">
              We’ll add pricing, docs, and a clean “App” CTA flow. Then we’ll
              build auth + workspace onboarding in the panel.
            </p>
          </div>
        </SectionReveal>
      </main>
    </div>
  );
}
