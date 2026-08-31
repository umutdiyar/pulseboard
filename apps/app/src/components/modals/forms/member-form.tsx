"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
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

import { memberSchema, type MemberFormValues } from "@/schemas/create-schemas";

import { useModalStore } from "@/store/modal-store";
import { useWorkspaceStore } from "@/store/workspace-store";

import { FormFieldError } from "./form-field-error";

export function MemberForm() {
  const closeModal = useModalStore((state) => state.closeModal);

  const inviteMember = useWorkspaceStore((state) => state.inviteMember);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),

    defaultValues: {
      email: "",
      role: "Member",
      message: "",
    },
  });

  const role = watch("role");

  async function onSubmit(values: MemberFormValues) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      inviteMember({
        email: values.email,
        role: values.role,
      });

      toast.success("Davet gönderildi", {
        description: `${values.email} çalışma alanına davet edildi.`,
      });

      reset();
      closeModal();
    } catch {
      toast.error("Davet gönderilemedi");
    }
  }

  return (
    <form
      id="invite-member-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="member-email">E-posta adresi</Label>

          <Input
            id="member-email"
            type="email"
            placeholder="isim@sirket.com"
            className="h-12 rounded-2xl bg-slate-50"
            {...register("email")}
          />

          <FormFieldError message={errors.email?.message} />
        </div>

        <div className="space-y-2">
          <Label>Rol</Label>

          <Select
            value={role}
            onValueChange={(value) =>
              setValue("role", value as MemberFormValues["role"])
            }
          >
            <SelectTrigger className="h-12 rounded-2xl bg-slate-50">
              <SelectValue />
            </SelectTrigger>

            <SelectContent
              position="popper"
              side="bottom"
              avoidCollisions={false}
            >
              <SelectItem value="Member">Üye</SelectItem>

              <SelectItem value="Admin">Yönetici</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="invite-message">Davet mesajı</Label>

        <Textarea
          id="invite-message"
          placeholder="Ekibe hoş geldin..."
          className="min-h-28 resize-none rounded-2xl bg-slate-50"
          {...register("message")}
        />

        <FormFieldError message={errors.message?.message} />
      </div>

      <div className="flex gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
          <Mail className="size-4 text-indigo-600" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            Davet bağlantısı
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            Backend entegrasyonu tamamlandığında kullanıcıya güvenli bir davet
            bağlantısı e-posta ile gönderilecek.
          </p>
        </div>
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
          Daveti gönder
        </Button>
      </div>
    </form>
  );
}
