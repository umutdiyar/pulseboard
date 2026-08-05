import { create } from "zustand";

export type CreateModalType = "project" | "task" | "lead" | "member" | null;

type ModalState = {
  type: CreateModalType;
  isOpen: boolean;
  openModal: (type: Exclude<CreateModalType, null>) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  isOpen: false,

  openModal: (type) => {
    set({
      type,
      isOpen: true,
    });
  },

  closeModal: () => {
    set({
      type: null,
      isOpen: false,
    });
  },
}));
