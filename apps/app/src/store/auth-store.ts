"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AUTH_STORAGE_KEY, DEMO_CREDENTIALS } from "../lib/auth/auth-config";

type User = {
  name: string;
  email: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  loginAsDemo: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 700));

        const normalizedEmail = email.trim().toLowerCase();

        if (
          normalizedEmail === DEMO_CREDENTIALS.email.toLowerCase() &&
          password === DEMO_CREDENTIALS.password
        ) {
          set({
            isAuthenticated: true,
            user: {
              name: "Admin User",
              email: DEMO_CREDENTIALS.email,
            },
          });
          return { success: true };
        }
        return { success: false, message: "E-posta veya şifre yanlış." };
      },

      loginAsDemo: () => {
        set({
          isAuthenticated: true,
          user: {
            name: "Admin User",
            email: DEMO_CREDENTIALS.email,
          },
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
    },
  ),
);
