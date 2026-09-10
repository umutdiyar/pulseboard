"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

type ClearFiltersButtonProps = {
  visible: boolean;
  onClear: () => void;
};

export function ClearFiltersButton({
  visible,
  onClear,
}: ClearFiltersButtonProps) {
  if (!visible) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClear}
      className="h-11 rounded-xl px-3 text-slate-500 hover:text-slate-900"
    >
      <RotateCcw className="mr-2 size-4" />
      Filtreleri temizle
    </Button>
  );
}
