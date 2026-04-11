export function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  const score = checks.filter(Boolean).length;

  const levels = [
    { label: "Çok zayıf", color: "bg-red-400" },
    { label: "Zayıf", color: "bg-orange-400" },
    { label: "Orta", color: "bg-amber-400" },
    { label: "Güçlü", color: "bg-emerald-400" },
    { label: "Çok güçlü", color: "bg-emerald-500" },
  ];

  const current = levels[score] ?? levels[0];

  return (
    <div className="mt-2">
      <div className="mb-1 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < score ? current.color : "bg-gray-100"
            }`}
          />
        ))}
      </div>
      <p className="text-[11px] text-gray-400">{current.label}</p>
    </div>
  );
}
