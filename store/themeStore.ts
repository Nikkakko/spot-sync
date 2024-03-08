import { Theme } from "@prisma/client";
import { create } from "zustand";

interface ThemeState {
  selectedTheme: Omit<Theme, "id" | "userId">;
}

interface ThemeActions {
  setSelectedTheme: (theme: Omit<Theme, "id" | "userId">) => void;
}

export const useThemeChoose = create<ThemeState & ThemeActions>(set => ({
  selectedTheme: {
    type: "DEFAULT",
    color: "DEFAULT",
  },

  setSelectedTheme: theme => set({ selectedTheme: theme }),
}));
