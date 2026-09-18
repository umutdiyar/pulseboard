"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { useAuthStore } from "../../store/auth-store";

function useAuthHydrated() {
  return useSyncExternalStore(
    (callback) => useAuthStore.persist?.onFinishHydration(callback) ?? (() => {}),
    () => useAuthStore.persist?.hasHydrated() ?? false,
    () => false,
  );
}

export function useRequireAuth(redirectTo = "/login") {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydrated = useAuthHydrated();

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
  const hydrated = useAuthHydrated();

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
