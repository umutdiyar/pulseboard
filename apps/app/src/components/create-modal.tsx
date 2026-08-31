"use client";

import {
  FolderKanban,
  ListTodo,
  Target,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createModalConfig } from "@/data/create-modal-data";

import { useModalStore, type CreateModalType } from "@/store/modal-store";

import { LeadForm } from "./modals/forms/lead-form";
import { MemberForm } from "./modals/forms/member-form";
import { ProjectForm } from "./modals/forms/project-form";
import { TaskForm } from "./modals/forms/task-form";

type ValidModalType = Exclude<CreateModalType, null>;

type ModalPresentation = {
  icon: LucideIcon;
  iconClassName: string;
};

const modalPresentation: Record<ValidModalType, ModalPresentation> = {
  project: {
    icon: FolderKanban,
    iconClassName: "from-indigo-500 to-violet-600",
  },

  task: {
    icon: ListTodo,
    iconClassName: "from-sky-500 to-indigo-600",
  },

  lead: {
    icon: Target,
    iconClassName: "from-emerald-500 to-teal-600",
  },

  member: {
    icon: UserPlus,
    iconClassName: "from-amber-500 to-orange-600",
  },
};

function ModalForm({ type }: { type: ValidModalType }) {
  switch (type) {
    case "project":
      return <ProjectForm />;

    case "task":
      return <TaskForm />;

    case "lead":
      return <LeadForm />;

    case "member":
      return <MemberForm />;
  }
}

export function CreateModal() {
  const isOpen = useModalStore((state) => state.isOpen);

  const type = useModalStore((state) => state.type);

  const closeModal = useModalStore((state) => state.closeModal);

  if (!type) {
    return null;
  }

  const config = createModalConfig[type];
  const presentation = modalPresentation[type];

  const Icon = presentation.icon;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <DialogContent
        className="
          flex max-h-[92dvh]
          w-[calc(100vw-1rem)]
          max-w-none
          flex-col
          gap-0
          overflow-hidden
          rounded-[1.75rem]
          border-slate-200
          bg-white
          p-0
          shadow-2xl
          sm:w-[calc(100vw-3rem)]
          sm:max-w-3xl
          sm:rounded-[2rem]
          lg:max-w-4xl
          xl:max-w-5xl
        "
      >
        <DialogHeader className="shrink-0 border-b border-slate-100 px-5 py-5 text-left sm:px-7 sm:py-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${presentation.iconClassName} shadow-lg`}
            >
              <Icon className="size-5 text-white" />
            </div>

            <div className="min-w-0">
              <DialogTitle className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                {config.title}
              </DialogTitle>

              <DialogDescription className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                {config.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 py-6 sm:px-7">
          <ModalForm type={type} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
