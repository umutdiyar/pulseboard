import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
  bottomText,
  bottomHref,
  bottomLabel,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  bottomText: string;
  bottomHref: string;
  bottomLabel: string;
}) {
  return (
    <div className="min-h-screen">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(56,189,248,0.14),transparent_55%),radial-gradient(900px_circle_at_50%_90%,rgba(16,185,129,0.12),transparent_55%)]" />
        <div className="mx-auto grid max-w-6xl place-items-center px-4 py-16">
          <div className="w-full max-w-md rounded-3xl bg-white/80 p-8 ring-1 ring-black/10 backdrop-blur shadow-[0_30px_80px_-55px_rgba(0,0,0,0.35)]">
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-black text-white">
                  ⚡
                </span>
                <span className="font-semibold tracking-tight text-black">
                  PulseBoard
                </span>
              </Link>
              <h1 className="mt-5 text-2xl font-semibold tracking-tight text-black">
                {title}
              </h1>
              <p className="mt-2 text-sm text-black/60">{subtitle}</p>

              {children}

              <div className="mt-6 text-sm text-black/60">
                {bottomText}{" "}
                <Link
                  href={bottomHref}
                  className="font-medium text-black hover:opacity-80"
                >
                  {bottomLabel}
                </Link>
              </div>

              <div className="mt-6 text-xs text-black/50">
                © {new Date().getFullYear()} PulseBoard
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
