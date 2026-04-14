"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth-store";

export function useRequireAuth(redirectTo = "/login") {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [hydrated, isAuthenticated, router, redirectTo]);

  return {
    hydrated,
    isAuthenticated,
    canRenderProtected: hydrated && isAuthenticated,
  };
}

export function useRedirectIfAuthenticated(redirectTo = "/dashboard") {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [hydrated, isAuthenticated, router, redirectTo]);

  return {
    hydrated,
    isAuthenticated,
  };
}
