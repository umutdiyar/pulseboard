"use client";

type PasswordFieldProps = {
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggle: () => void;
  placeholder?: string;
  label: string;
};

export function PasswordField({
  value,
  onChange,
  showPassword,
  onToggle,
  placeholder = "Şifrenizi girin",
  label,
}: PasswordFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-semibold text-gray-600">
        {label}
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
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all focus:border-gray-900 focus:outline-none focus:ring-[3px] focus:ring-gray-900/8"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-3.5 flex items-center text-gray-300 transition-colors hover:text-gray-600"
        >
          {showPassword ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
