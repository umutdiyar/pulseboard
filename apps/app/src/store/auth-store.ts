"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AUTH_STORAGE_KEY, DEMO_CREDENTIALS } from "../lib/auth/auth-config";

type User = {
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
};

type Workspace = {
  id: string;
  name: string;
  slug: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  workspace: Workspace | null;

  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  loginAsDemo: () => void;
  logout: () => void;
};

const demoUser: User = {
  name: "Admin User",
  email: DEMO_CREDENTIALS.email,
  role: "Owner",
};

const demoWorkspace: Workspace = {
  id: "workspace-demo",
  name: "PulseBoard Demo",
  slug: "pulseboard-demo",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      workspace: null,

      login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 700));

        const normalizedEmail = email.trim().toLowerCase();
        const isValidCredential =
          normalizedEmail === DEMO_CREDENTIALS.email.toLowerCase() &&
          password === DEMO_CREDENTIALS.password;

        if (!isValidCredential) {
          return { success: false, message: "E-posta veya şifre yanlış." };
        }
        set({
          isAuthenticated: true,
          user: demoUser,
          workspace: demoWorkspace,
        });
        return { success: true };
      },

      loginAsDemo: () => {
        set({
          isAuthenticated: true,
          user: demoUser,
          workspace: demoWorkspace,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          workspace: null,
        });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      version: 2,
      migrate: () => ({
        isAuthenticated: false,
        user: null,
        workspace: null,
      }),
    },
  ),
);
