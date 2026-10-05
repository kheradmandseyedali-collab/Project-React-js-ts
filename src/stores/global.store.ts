import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme } from "../types/general";

type GlobalStore = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set) => ({
      theme: "dark",

      toggleTheme: () => {
        set((state) => {
          const newTheme: Theme = state.theme === "dark" ? "light" : "dark";
          if (typeof document !== "undefined") {
            document.documentElement.classList.toggle("dark", newTheme === "dark");
          }
          return { theme: newTheme };
        });
      },

      setTheme: (newTheme: Theme) => {
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", newTheme === "dark");
        }
        set({ theme: newTheme });
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", state.theme === "dark");
        }
      },
    }
  )
);
