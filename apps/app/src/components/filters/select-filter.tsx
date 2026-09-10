"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { FilterOption } from "@/types/filters";

type SelectFilterProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: FilterOption[];
};

export function SelectFilter({
  value,
  onChange,
  placeholder,
  options,
}: SelectFilterProps) {
  return (
    <Select value={value || "all"} onValueChange={onChange}>
      <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white shadow-none sm:w-44">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent position="popper" side="bottom" sideOffset={6}>
        <SelectItem value="all">{placeholder}</SelectItem>

        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
