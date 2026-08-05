"use client";

import type { ReactNode } from "react";
import { CreateModal } from "@/components/create-modal";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CreateModal />
    </>
  );
}
