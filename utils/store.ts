import { create } from "zustand";
import * as React from "react";

interface refStore {
  ref: React.RefObject<HTMLFormElement>;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const useRef = create<refStore>(set => ({
  ref: React.createRef<HTMLFormElement>(),
  isSubmitting: false,
  setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
}));
