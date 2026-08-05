"use client";

import { useState, type FormEvent } from "react";
import {
  FolderKanban,
  ListTodo,
  Target,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { createModalConfig } from "@/data/create-modal-data";
import { type CreateModalType, useModalStore } from "@/store/modal-store";

const fieldClassName =
  "h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm shadow-none transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-indigo-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-100";

const selectTriggerClassName =
  "h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm shadow-none transition-colors hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100";

const textareaClassName =
  "min-h-28 w-full resize-none rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-none transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-indigo-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-100";

type ModalIconDefinition = {
  icon: LucideIcon;
  background: string;
};

const modalIcons: Record<
  Exclude<CreateModalType, null>,
  ModalIconDefinition
> = {
  project: {
    icon: FolderKanban,
    background: "from-indigo-600 to-violet-500",
  },
  task: {
    icon: ListTodo,
    background: "from-cyan-500 to-blue-600",
  },
  lead: {
    icon: Target,
    background: "from-emerald-500 to-cyan-500",
  },
  member: {
    icon: UserPlus,
    background: "from-violet-500 to-fuchsia-500",
  },
};

function ModalIcon({ type }: { type: Exclude<CreateModalType, null> }) {
  const definition = modalIcons[type];
  const Icon = definition.icon;

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${definition.background}`}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}

/**
 * Select menülerinin daima trigger'ın aşağısında açılmasını sağlar.
 *
 * avoidCollisions={false} Radix'in menüyü otomatik olarak yukarı
 * çevirmesini engeller.
 */
function ModalSelectContent({ children }: { children: React.ReactNode }) {
  return (
    <SelectContent
      position="popper"
      side="bottom"
      align="start"
      sideOffset={6}
      avoidCollisions={false}
      className="z-[100] max-h-60 min-w-[var(--radix-select-trigger-width)] rounded-2xl border-slate-200 bg-white shadow-xl"
    >
      {children}
    </SelectContent>
  );
}

export function CreateModal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const type = useModalStore((state) => state.type);
  const closeModal = useModalStore((state) => state.closeModal);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!type) {
    return null;
  }

  const config = createModalConfig[type];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Backend bağlanana kadar geçici işlem.
      await new Promise((resolve) => setTimeout(resolve, 700));
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open && !isSubmitting) {
      closeModal();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="
          flex
          max-h-[92dvh]
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
        {/* Sabit başlık */}
        <div className="shrink-0 border-b border-slate-100 bg-white px-5 py-5 sm:px-7 sm:py-6">
          <DialogHeader className="text-left">
            <div className="flex items-start gap-4">
              <ModalIcon type={type} />

              <div className="min-w-0 flex-1 pt-0.5">
                <DialogTitle className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                  {config.title}
                </DialogTitle>

                <DialogDescription className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                  {config.description}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          {/* Yalnızca form gövdesi scroll olur */}
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5 py-6 sm:px-7 lg:px-8">
            {type === "project" && <ProjectFields />}
            {type === "task" && <TaskFields />}
            {type === "lead" && <LeadFields />}
            {type === "member" && <MemberFields />}
          </div>

          {/* Sabit footer */}
          <DialogFooter className="shrink-0 flex-row justify-end gap-2 border-t border-slate-100 bg-slate-50/90 px-5 py-8 backdrop-blur sm:px-7 ">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-2xl px-5"
              disabled={isSubmitting}
              onClick={closeModal}
            >
              İptal
            </Button>

            <Button
              type="submit"
              className="h-11 rounded-2xl bg-slate-950 px-5 text-white hover:bg-slate-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "İşleniyor..." : config.submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ProjectFields() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-2">
          <Label htmlFor="project-name">Proje adı</Label>
          <Input
            id="project-name"
            name="name"
            required
            placeholder="Örn. PulseBoard Mobile"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <Label>Durum</Label>

          <Select defaultValue="planning">
            <SelectTrigger className={selectTriggerClassName}>
              <SelectValue placeholder="Durum seç" />
            </SelectTrigger>

            <ModalSelectContent>
              <SelectItem value="planning">Planlama</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="paused">Beklemede</SelectItem>
              <SelectItem value="completed">Tamamlandı</SelectItem>
            </ModalSelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-description">Açıklama</Label>
        <Textarea
          id="project-description"
          name="description"
          required
          placeholder="Projenin amacı ve kapsamını kısaca yaz..."
          className={textareaClassName}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="project-owner">Proje sahibi</Label>

          <Select defaultValue="umut">
            <SelectTrigger
              id="project-owner"
              className={selectTriggerClassName}
            >
              <SelectValue placeholder="Proje sahibi seç" />
            </SelectTrigger>

            <ModalSelectContent>
              <SelectItem value="umut">Umut Diyar</SelectItem>
              <SelectItem value="demo">Demo User</SelectItem>
            </ModalSelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-due-date">Bitiş tarihi</Label>
          <Input
            id="project-due-date"
            name="dueDate"
            type="date"
            required
            className={fieldClassName}
          />
        </div>
      </div>
    </div>
  );
}

function TaskFields() {
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <Label htmlFor="task-title">Görev başlığı</Label>
        <Input
          id="task-title"
          name="title"
          required
          placeholder="Örn. Dashboard filtrelerini tamamla"
          className={fieldClassName}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="task-description">Açıklama</Label>
        <Textarea
          id="task-description"
          name="description"
          placeholder="Görevin detaylarını yaz..."
          className={textareaClassName}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label>Proje</Label>

          <Select defaultValue="pulseboard">
            <SelectTrigger className={selectTriggerClassName}>
              <SelectValue placeholder="Proje seç" />
            </SelectTrigger>

            <ModalSelectContent>
              <SelectItem value="pulseboard">PulseBoard App</SelectItem>
              <SelectItem value="marketing">Marketing Website</SelectItem>
              <SelectItem value="backend">Backend API</SelectItem>
              <SelectItem value="crm">Mini CRM</SelectItem>
            </ModalSelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Durum</Label>

          <Select defaultValue="todo">
            <SelectTrigger className={selectTriggerClassName}>
              <SelectValue placeholder="Durum seç" />
            </SelectTrigger>

            <ModalSelectContent>
              <SelectItem value="todo">Yapılacak</SelectItem>
              <SelectItem value="in-progress">Devam ediyor</SelectItem>
              <SelectItem value="review">İncelemede</SelectItem>
              <SelectItem value="done">Tamamlandı</SelectItem>
            </ModalSelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Öncelik</Label>

          <Select defaultValue="medium">
            <SelectTrigger className={selectTriggerClassName}>
              <SelectValue placeholder="Öncelik seç" />
            </SelectTrigger>

            <ModalSelectContent>
              <SelectItem value="low">Düşük</SelectItem>
              <SelectItem value="medium">Orta</SelectItem>
              <SelectItem value="high">Yüksek</SelectItem>
            </ModalSelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Atanan kişi</Label>

          <Select defaultValue="umut">
            <SelectTrigger className={selectTriggerClassName}>
              <SelectValue placeholder="Kişi seç" />
            </SelectTrigger>

            <ModalSelectContent>
              <SelectItem value="umut">Umut Diyar</SelectItem>
              <SelectItem value="demo">Demo User</SelectItem>
              <SelectItem value="unassigned">Atanmamış</SelectItem>
            </ModalSelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="task-due-date">Bitiş tarihi</Label>
          <Input
            id="task-due-date"
            name="dueDate"
            type="date"
            required
            className={fieldClassName}
          />
        </div>
      </div>
    </div>
  );
}

function LeadFields() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="lead-name">Ad soyad</Label>
          <Input
            id="lead-name"
            name="name"
            required
            placeholder="Örn. Ayşe Demir"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-company">Şirket</Label>
          <Input
            id="lead-company"
            name="company"
            required
            placeholder="Örn. NovaTech"
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-2">
          <Label htmlFor="lead-email">E-posta</Label>
          <Input
            id="lead-email"
            name="email"
            type="email"
            required
            placeholder="ornek@sirket.com"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-value">Tahmini değer</Label>
          <Input
            id="lead-value"
            name="value"
            type="number"
            min="0"
            required
            placeholder="24000"
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label>Pipeline aşaması</Label>

          <Select defaultValue="new">
            <SelectTrigger className={selectTriggerClassName}>
              <SelectValue placeholder="Aşama seç" />
            </SelectTrigger>

            <ModalSelectContent>
              <SelectItem value="new">Yeni</SelectItem>
              <SelectItem value="qualified">Nitelikli</SelectItem>
              <SelectItem value="proposal">Teklif</SelectItem>
              <SelectItem value="won">Kazanıldı</SelectItem>
            </ModalSelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Öncelik</Label>

          <Select defaultValue="medium">
            <SelectTrigger className={selectTriggerClassName}>
              <SelectValue placeholder="Öncelik seç" />
            </SelectTrigger>

            <ModalSelectContent>
              <SelectItem value="low">Düşük</SelectItem>
              <SelectItem value="medium">Orta</SelectItem>
              <SelectItem value="high">Yüksek</SelectItem>
            </ModalSelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sorumlu kişi</Label>

          <Select defaultValue="umut">
            <SelectTrigger className={selectTriggerClassName}>
              <SelectValue placeholder="Sorumlu seç" />
            </SelectTrigger>

            <ModalSelectContent>
              <SelectItem value="umut">Umut Diyar</SelectItem>
              <SelectItem value="demo">Demo User</SelectItem>
            </ModalSelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-notes">Notlar</Label>
        <Textarea
          id="lead-notes"
          name="notes"
          placeholder="Görüşme detayları veya müşteri adayı hakkında not ekle..."
          className={textareaClassName}
        />
      </div>
    </div>
  );
}

function MemberFields() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-2">
          <Label htmlFor="member-email">E-posta adresi</Label>
          <Input
            id="member-email"
            name="email"
            type="email"
            required
            placeholder="uye@sirket.com"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <Label>Rol</Label>

          <Select defaultValue="member">
            <SelectTrigger className={selectTriggerClassName}>
              <SelectValue placeholder="Rol seç" />
            </SelectTrigger>

            <ModalSelectContent>
              <SelectItem value="admin">Yönetici</SelectItem>
              <SelectItem value="member">Üye</SelectItem>
            </ModalSelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="member-message">Davet mesajı</Label>
        <Textarea
          id="member-message"
          name="message"
          placeholder="Ekibe katılman için seni PulseBoard çalışma alanımıza davet ediyorum."
          className={textareaClassName}
        />
      </div>

      <div className="rounded-3xl border border-blue-100 bg-blue-50/70 px-5 py-4">
        <p className="text-sm leading-6 text-blue-700">
          Davet edilen kişi e-posta üzerinden çalışma alanına katılacak. Backend
          tamamlandığında bu işlem gerçek davet sistemiyle çalışacak.
        </p>
      </div>
    </div>
  );
}
