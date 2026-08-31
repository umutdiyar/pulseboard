"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

import {
  projectSchema,
  type ProjectFormValues,
} from "@/schemas/create-schemas";

import { useModalStore } from "@/store/modal-store";
import { useWorkspaceStore } from "@/store/workspace-store";

import { FormFieldError } from "./form-field-error";

const fieldClassName =
  "h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 shadow-none transition-colors placeholder:text-slate-400 focus-visible:border-indigo-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-100";

const selectClassName =
  "h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-4 shadow-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100";

export function ProjectForm() {
  const closeModal = useModalStore((state) => state.closeModal);

  const addProject = useWorkspaceStore((state) => state.addProject);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),

    defaultValues: {
      name: "",
      description: "",
      status: "Planning",
      owner: "",
      dueDate: "",
    },
  });

  const status = watch("status");
  const owner = watch("owner");

  async function onSubmit(values: ProjectFormValues) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      addProject(values);

      toast.success("Proje oluşturuldu", {
        description: `${values.name} çalışma alanına eklendi.`,
      });

      reset();
      closeModal();
    } catch {
      toast.error("Proje oluşturulamadı", {
        description: "Beklenmeyen bir hata oluştu. Tekrar deneyin.",
      });
    }
  }

  return (
    <form
      id="create-project-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="project-name">Proje adı</Label>

          <Input
            id="project-name"
            placeholder="Örn. Mobil uygulama"
            className={fieldClassName}
            {...register("name")}
          />

          <FormFieldError message={errors.name?.message} />
        </div>

        <div className="space-y-2">
          <Label>Durum</Label>

          <Select
            value={status}
            onValueChange={(value) =>
              setValue("status", value as ProjectFormValues["status"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className={selectClassName}>
              <SelectValue />
            </SelectTrigger>

            <SelectContent
              position="popper"
              side="bottom"
              sideOffset={6}
              avoidCollisions={false}
            >
              <SelectItem value="Planning">Planlama</SelectItem>

              <SelectItem value="Active">Aktif</SelectItem>

              <SelectItem value="Paused">Duraklatıldı</SelectItem>

              <SelectItem value="Completed">Tamamlandı</SelectItem>
            </SelectContent>
          </Select>

          <FormFieldError message={errors.status?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-description">Açıklama</Label>

        <Textarea
          id="project-description"
          placeholder="Projenin amacını ve kapsamını açıklayın..."
          className="min-h-32 resize-none rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 shadow-none focus-visible:border-indigo-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-100"
          {...register("description")}
        />

        <FormFieldError message={errors.description?.message} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Proje sahibi</Label>

          <Select
            value={owner}
            onValueChange={(value) =>
              setValue("owner", value, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className={selectClassName}>
              <SelectValue placeholder="Kişi seçin" />
            </SelectTrigger>

            <SelectContent
              position="popper"
              side="bottom"
              sideOffset={6}
              avoidCollisions={false}
            >
              <SelectItem value="Umut Diyar">Umut Diyar</SelectItem>

              <SelectItem value="Demo User">Demo User</SelectItem>
            </SelectContent>
          </Select>

          <FormFieldError message={errors.owner?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-due-date">Bitiş tarihi</Label>

          <Input
            id="project-due-date"
            type="date"
            className={fieldClassName}
            {...register("dueDate")}
          />

          <FormFieldError message={errors.dueDate?.message} />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={closeModal}
          className="h-11 rounded-xl"
        >
          İptal
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-xl bg-slate-950 px-6 text-white hover:bg-slate-800"
        >
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          Projeyi oluştur
        </Button>
      </div>
    </form>
  );
}
