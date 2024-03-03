import { create } from "zustand";
import * as React from "react";
import { UseControllerProps } from "react-hook-form";
import { UpdateFormSchema } from "@/lib/validation";

interface refStore {
  ref: React.RefObject<HTMLFormElement>;
  isSubmitting: boolean;
  //check if anything is changed
  isChanged: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsChanged: (isChanged: boolean) => void;
}

export const useRef = create<refStore>(set => ({
  ref: React.createRef<HTMLFormElement>(),
  isSubmitting: false,
  isChanged: false,
  setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
  setIsChanged: (isChanged: boolean) => set({ isChanged }),
}));
