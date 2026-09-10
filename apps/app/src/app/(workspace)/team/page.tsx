"use client";

import { Plus, Users, UserSearch } from "lucide-react";

import { ClearFiltersButton } from "@/components/filters/clear-filters-button";
import { FilterBar } from "@/components/filters/filter-bar";
import { SearchFilter } from "@/components/filters/search-filter";
import { SelectFilter } from "@/components/filters/select-filter";
import { EmptyState } from "@/components/shared/empty-state";

import { TeamMemberCard } from "@/components/team/team-member-card";
import { RoleCard } from "@/components/team/role-card";
import { roleDescriptions } from "@/data/team-data";
import { useWorkspaceStore } from "@/store/workspace-store";
import { useQueryFilters } from "@/hooks/use-query-filters";
import { useRequireAuth } from "@/lib/auth/auth-guard";
import { filterMembers } from "@/lib/selectors/team-selectors";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/modal-store";

export default function TeamPage() {
  const { canRenderProtected } = useRequireAuth("/login");
  const openModal = useModalStore((state) => state.openModal);
  const teamMembers = useWorkspaceStore((state) => state.members);

  const { getFilter, setFilter, clearFilters, hasFilters } = useQueryFilters();

  const search = getFilter("q");
  const role = getFilter("role");
  const status = getFilter("status");

  const filteredMembers = filterMembers(teamMembers, {
    search,
    role,
    status,
  });

  const roleOptions = roleDescriptions.map((roleItem) => ({
    label: roleItem.role,
    value: roleItem.role,
  }));

  const statusOptions = Array.from(
    new Set(teamMembers.map((member) => member.status)),
  ).map((statusValue) => ({
    label:
      statusValue === "Active"
        ? "Aktif"
        : statusValue === "Pending"
          ? "Davet Bekliyor"
          : statusValue,
    value: statusValue,
  }));

  if (!canRenderProtected) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Team yükleniyor...</p>
      </main>
    );
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="relative p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_90%_10%,rgba(99,102,241,0.14),transparent_40%),radial-gradient(800px_circle_at_10%_100%,rgba(16,185,129,0.12),transparent_45%)]" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Users size={22} />
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Ekip
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Workspace üyelerini, rollerini ve davet durumlarını yönet.
                Backend bağlandığında gerçek üyelik ve yetkilendirme burada
                çalışacak.
              </p>
            </div>

            <Button className="rounded-2xl" onClick={() => openModal("member")}>
              <Plus size={18} />
              Üye Davet Et
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {roleDescriptions.map((role, index) => (
          <RoleCard
            key={role.role}
            role={role.role}
            description={role.description}
            index={index}
          />
        ))}
      </section>

      <FilterBar>
        <SearchFilter
          value={search}
          onChange={(value) => setFilter("q", value)}
          placeholder="Üye ara..."
        />

        <SelectFilter
          value={role}
          onChange={(value) => setFilter("role", value)}
          placeholder="Tüm roller"
          options={roleOptions}
        />

        <SelectFilter
          value={status}
          onChange={(value) => setFilter("status", value)}
          placeholder="Tüm durumlar"
          options={statusOptions}
        />

        <ClearFiltersButton visible={hasFilters()} onClear={clearFilters} />
      </FilterBar>

      {filteredMembers.length === 0 ? (
        <EmptyState
          icon={UserSearch}
          title="Üye bulunamadı"
          description="Arama kriterlerine uygun ekip üyesi bulunamadı. Filtreleri değiştirerek tekrar deneyin."
        />
      ) : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </section>
      )}
    </div>
  );
}
