import { create } from "zustand";

type ModalType = "subscription" | "cancel-sub";

interface ModalData {}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data?: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>(set => ({
  type: null,
  isOpen: false,
  data: undefined,
  onOpen: (type, data) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false, data: undefined }),
}));
