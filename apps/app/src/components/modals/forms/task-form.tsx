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

import { taskSchema, type TaskFormValues } from "@/schemas/create-schemas";

import { useModalStore } from "@/store/modal-store";
import { useWorkspaceStore } from "@/store/workspace-store";

import { FormFieldError } from "./form-field-error";

const fieldClassName =
  "h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 shadow-none placeholder:text-slate-400 focus-visible:border-indigo-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-indigo-100";

const selectClassName =
  "h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-4 shadow-none";

export function TaskForm() {
  const closeModal = useModalStore((state) => state.closeModal);

  const addTask = useWorkspaceStore((state) => state.addTask);

  const projects = useWorkspaceStore((state) => state.projects);

  const members = useWorkspaceStore((state) => state.members);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      title: "",
      description: "",
      project: "",
      status: "Todo",
      priority: "Medium",
      assignee: "",
      dueDate: "",
    },
  });

  const project = watch("project");
  const status = watch("status");
  const priority = watch("priority");
  const assignee = watch("assignee");

  async function onSubmit(values: TaskFormValues) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      addTask(values);

      toast.success("Görev oluşturuldu", {
        description: `${values.title} görev listesine eklendi.`,
      });

      reset();
      closeModal();
    } catch {
      toast.error("Görev oluşturulamadı");
    }
  }

  return (
    <form
      id="create-task-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="task-title">Görev başlığı</Label>

        <Input
          id="task-title"
          placeholder="Örn. Dashboard filtrelerini geliştir"
          className={fieldClassName}
          {...register("title")}
        />

        <FormFieldError message={errors.title?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="task-description">Açıklama</Label>

        <Textarea
          id="task-description"
          placeholder="Görev detaylarını yazın..."
          className="min-h-28 resize-none rounded-2xl border-slate-200 bg-slate-50"
          {...register("description")}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Proje</Label>

          <Select
            value={project}
            onValueChange={(value) =>
              setValue("project", value, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className={selectClassName}>
              <SelectValue placeholder="Proje seçin" />
            </SelectTrigger>

            <SelectContent
              position="popper"
              side="bottom"
              avoidCollisions={false}
            >
              {projects.map((projectItem) => (
                <SelectItem key={projectItem.id} value={projectItem.name}>
                  {projectItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormFieldError message={errors.project?.message} />
        </div>

        <div className="space-y-2">
          <Label>Durum</Label>

          <Select
            value={status}
            onValueChange={(value) =>
              setValue("status", value as TaskFormValues["status"])
            }
          >
            <SelectTrigger className={selectClassName}>
              <SelectValue />
            </SelectTrigger>

            <SelectContent
              position="popper"
              side="bottom"
              avoidCollisions={false}
            >
              <SelectItem value="Todo">Yapılacak</SelectItem>
              <SelectItem value="In Progress">Devam Ediyor</SelectItem>
              <SelectItem value="Review">İncelemede</SelectItem>
              <SelectItem value="Done">Tamamlandı</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Öncelik</Label>

          <Select
            value={priority}
            onValueChange={(value) =>
              setValue("priority", value as TaskFormValues["priority"])
            }
          >
            <SelectTrigger className={selectClassName}>
              <SelectValue />
            </SelectTrigger>

            <SelectContent
              position="popper"
              side="bottom"
              avoidCollisions={false}
            >
              <SelectItem value="Low">Düşük</SelectItem>
              <SelectItem value="Medium">Orta</SelectItem>
              <SelectItem value="High">Yüksek</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Atanan kişi</Label>

          <Select
            value={assignee}
            onValueChange={(value) =>
              setValue("assignee", value, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className={selectClassName}>
              <SelectValue placeholder="Üye seçin" />
            </SelectTrigger>

            <SelectContent
              position="popper"
              side="bottom"
              avoidCollisions={false}
            >
              {members
                .filter((member) => member.status === "Active")
                .map((member) => (
                  <SelectItem key={member.id} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <FormFieldError message={errors.assignee?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="task-date">Bitiş tarihi</Label>

          <Input
            id="task-date"
            type="date"
            className={fieldClassName}
            {...register("dueDate")}
          />

          <FormFieldError message={errors.dueDate?.message} />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={closeModal}
        >
          İptal
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-950 text-white"
        >
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          Görevi oluştur
        </Button>
      </div>
    </form>
  );
}
