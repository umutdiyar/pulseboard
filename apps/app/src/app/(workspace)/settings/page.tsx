"use client";

import { Save, Settings, Trash } from "lucide-react";
import { SettingsSectionCard } from "@/components/settings/settings-section-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { settingsSections } from "@/data/settings-data";
import { useRequireAuth } from "@/lib/auth/auth-guard";

export default function SettingsPage() {
  const { canRenderProtected } = useRequireAuth("/login");

  if (!canRenderProtected) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Ayarlar yükleniyor...</p>
      </main>
    );
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="relative p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_90%_10%,rgba(99,102,241,0.14),transparent_40%),radial-gradient(800px_circle_at_10%_100%,rgba(56,189,248,0.12),transparent_45%)]" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Settings size={22} />
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Ayarlar
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Çalışma alanı, roller, güvenlik, bildirimler ve ürün
                tercihlerini buradan yöneteceksin. Backend bağlandığında bu
                alanlar gerçek ayarlara dönüşecek.
              </p>
            </div>

            <Button className="rounded-2xl">
              <Save size={18} />
              Değişiklikleri Kaydet
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {settingsSections.map((section, index) => (
          <SettingsSectionCard
            key={section.title}
            title={section.title}
            description={section.description}
            icon={section.icon}
            danger={section.danger}
            index={index}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Çalışma Alanı Genel
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Temel workspace kimliği ve URL ayarları.
              </p>
            </div>

            <Badge variant="secondary" className="rounded-full">
              Demo
            </Badge>
          </div>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">
                Çalışma Alanı Adı
              </span>
              <input
                defaultValue="PulseBoard Demo"
                className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-slate-100"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">
                URL Kısaltması
              </span>
              <input
                defaultValue="pulseboard-demo"
                className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-slate-100"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">
                Saat Dilimi
              </span>
              <input
                defaultValue="Europe/Istanbul"
                className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-slate-100"
              />
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">
            Plan ve Kullanım
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Şimdilik demo plan. Faturalandırma modülü backend sonrası
            bağlanacak.
          </p>

          <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
            <p className="text-sm text-white/60">Mevcut Plan</p>
            <p className="mt-2 text-2xl font-semibold">Ücretsiz</p>
            <p className="mt-2 text-sm text-white/50">
              1 çalışma alanı · 5 üye · temel analizler
            </p>
          </div>

          <Button variant="outline" className="mt-4 w-full rounded-2xl">
            Planı Yükselt
          </Button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">Dil ve Bölge</h2>
          <p className="mt-1 text-sm text-slate-500">
            Uygulama dili ve bölgesel tercihleri buradan yönet.
          </p>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">
                Uygulama Dili
              </span>
              <select className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-slate-100">
                <option>Türkçe</option>
                <option>English</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">Bölge</span>
              <select className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-slate-100">
                <option>Türkiye</option>
                <option>Europe</option>
                <option>United States</option>
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">
            Bildirim Tercihleri
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Hangi bildirimleri almak istediğini seç.
          </p>

          <div className="mt-6 space-y-3">
            {[
              "E-posta bildirimleri",
              "Tarayıcı bildirimleri",
              "Haftalık özet raporu",
              "Ürün güncellemeleri",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">Güvenlik</h2>
          <p className="mt-1 text-sm text-slate-500">
            Oturum, şifre ve güvenlik tercihleri.
          </p>

          <div className="mt-6 space-y-3">
            {[
              ["İki aşamalı doğrulama", "Yakında"],
              ["Aktif oturumlar", "2 cihaz"],
              ["Şifre değiştirme", "Backend sonrası"],
            ].map(([title, value]) => (
              <div
                key={title}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <span className="text-sm font-medium text-slate-700">
                  {title}
                </span>
                <span className="text-xs text-slate-500">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">
            API Anahtarları
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Harici entegrasyonlar için API anahtarları.
          </p>

          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm font-medium text-slate-700">
              Henüz API anahtarı yok
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Backend ve yetkilendirme tamamlandığında burada anahtar
              oluşturabileceksin.
            </p>

            <Button variant="outline" className="mt-4 rounded-2xl">
              API Anahtarı Oluştur
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-red-700">
          Tehlikeli Bölge
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Bu işlemler geri alınamaz. Şimdilik sadece UI olarak hazır.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="rounded-2xl border-red-200 text-red-700 hover:bg-red-50 hover:text-red-700"
          >
            Sahipliği Devret
          </Button>

          <Button className="rounded-2xl w-36 bg-red-600 text-white hover:bg-red-700">
            Çalışma Alanını Sil
          </Button>
        </div>
      </section>
    </div>
  );
}
