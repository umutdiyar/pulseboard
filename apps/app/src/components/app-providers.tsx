"use client";

import type { ReactNode } from "react";
import { CreateModal } from "@/components/create-modal";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CreateModal />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
