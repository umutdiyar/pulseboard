"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchFilterProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchFilter({
  value,
  onChange,
  placeholder = "Ara...",
}: SearchFilterProps) {
  return (
    <div className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-xl border-slate-200 bg-white pl-10 pr-10 shadow-none"
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onChange("")}
          className="absolute right-1.5 top-1/2 size-8 -translate-y-1/2 rounded-lg text-slate-400 hover:text-slate-900"
          aria-label="Aramayı temizle"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
