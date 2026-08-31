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

import { leadSchema, type LeadFormValues } from "@/schemas/create-schemas";

import { useModalStore } from "@/store/modal-store";
import { useWorkspaceStore } from "@/store/workspace-store";

import { FormFieldError } from "./form-field-error";

export function LeadForm() {
  const closeModal = useModalStore((state) => state.closeModal);

  const addLead = useWorkspaceStore((state) => state.addLead);

  const members = useWorkspaceStore((state) => state.members);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),

    defaultValues: {
      name: "",
      company: "",
      email: "",
      value: 0,
      stage: "New",
      priority: "Medium",
      owner: "",
      notes: "",
    },
  });

  const stage = watch("stage");
  const priority = watch("priority");
  const owner = watch("owner");

  async function onSubmit(values: LeadFormValues) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      addLead(values);

      toast.success("Müşteri adayı oluşturuldu", {
        description: `${values.name} CRM pipeline'a eklendi.`,
      });

      reset();
      closeModal();
    } catch {
      toast.error("Müşteri adayı oluşturulamadı");
    }
  }

  const inputClass =
    "h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 shadow-none";

  const selectClass =
    "h-12 w-full rounded-2xl border-slate-200 bg-slate-50 px-4 shadow-none";

  return (
    <form
      id="create-lead-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="lead-name">Ad soyad</Label>

          <Input
            id="lead-name"
            placeholder="Ayşe Yılmaz"
            className={inputClass}
            {...register("name")}
          />

          <FormFieldError message={errors.name?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-company">Şirket</Label>

          <Input
            id="lead-company"
            placeholder="Nova Teknoloji"
            className={inputClass}
            {...register("company")}
          />

          <FormFieldError message={errors.company?.message} />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="lead-email">E-posta</Label>

          <Input
            id="lead-email"
            type="email"
            className={inputClass}
            {...register("email")}
          />

          <FormFieldError message={errors.email?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-value">Tahmini değer</Label>

          <Input
            id="lead-value"
            type="number"
            min={0}
            className={inputClass}
            {...register("value")}
          />

          <FormFieldError message={errors.value?.message} />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Pipeline</Label>

          <Select
            value={stage}
            onValueChange={(value) =>
              setValue("stage", value as LeadFormValues["stage"])
            }
          >
            <SelectTrigger className={selectClass}>
              <SelectValue />
            </SelectTrigger>

            <SelectContent
              position="popper"
              side="bottom"
              avoidCollisions={false}
            >
              <SelectItem value="New">Yeni</SelectItem>
              <SelectItem value="Qualified">Nitelikli</SelectItem>
              <SelectItem value="Proposal">Teklif</SelectItem>
              <SelectItem value="Won">Kazanıldı</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Öncelik</Label>

          <Select
            value={priority}
            onValueChange={(value) =>
              setValue("priority", value as LeadFormValues["priority"])
            }
          >
            <SelectTrigger className={selectClass}>
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

        <div className="space-y-2">
          <Label>Sorumlu</Label>

          <Select
            value={owner}
            onValueChange={(value) =>
              setValue("owner", value, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className={selectClass}>
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

          <FormFieldError message={errors.owner?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-notes">Notlar</Label>

        <Textarea
          id="lead-notes"
          placeholder="Görüşme veya fırsat hakkında not ekleyin..."
          className="min-h-28 resize-none rounded-2xl border-slate-200 bg-slate-50"
          {...register("notes")}
        />
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={closeModal}
          disabled={isSubmitting}
        >
          İptal
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-950 text-white"
        >
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          Müşteri adayı oluştur
        </Button>
      </div>
    </form>
  );
}
