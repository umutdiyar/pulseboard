"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    router.replace(isAuthenticated ? "/dashboard" : "/login");
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen items-center justfiyy-center bg-[#fafafa]">
      <div className="text-sm text-gray-500">Yönlendiriliyorsunuz...</div>
    </div>
  );
}
