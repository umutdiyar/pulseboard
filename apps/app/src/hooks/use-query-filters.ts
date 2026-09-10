"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function getFilter(key: string) {
    return searchParams.get(key) ?? "";
  }

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function setFilters(values: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(values).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function clearFilters() {
    router.replace(pathname, {
      scroll: false,
    });
  }

  function hasFilters() {
    return searchParams.size > 0;
  }

  return {
    searchParams,
    getFilter,
    setFilter,
    setFilters,
    clearFilters,
    hasFilters,
  };
}
