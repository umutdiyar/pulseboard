"use client";

import {
  Activity as ActivityIcon,
  FolderKanban,
  ListTodo,
  Target,
  UserPlus,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  formatRelativeTime,
  getActivityDescription,
} from "@/lib/activities/activity-utils";

import { useWorkspaceStore } from "@/store/workspace-store";

import type { ActivityEntityType } from "@/types/workspace";

const entityIcons: Record<ActivityEntityType, typeof ActivityIcon> = {
  project: FolderKanban,
  task: ListTodo,
  lead: Target,
  member: UserPlus,
  sprint: ActivityIcon,
};

export function ActivityFeed() {
  const activities = useWorkspaceStore((state) => state.activities);

  const recentActivities = activities.slice(0, 6);

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold text-slate-950">
            Son aktiviteler
          </CardTitle>

          <p className="mt-1 text-sm text-slate-500">
            Çalışma alanındaki son hareketler
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100">
          <ActivityIcon className="size-4 text-slate-600" />
        </div>
      </CardHeader>

      <CardContent>
        {recentActivities.length === 0 ? (
          <div className="flex min-h-52 flex-col items-center justify-center text-center">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-100">
              <ActivityIcon className="size-5 text-slate-400" />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-900">
              Henüz aktivite yok
            </p>

            <p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">
              Proje, görev veya müşteri adayı oluşturduğunuzda aktiviteler
              burada görünecek.
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {recentActivities.map((activity) => {
              const Icon = entityIcons[activity.entityType];

              return (
                <div
                  key={activity.id}
                  className="group flex gap-3 rounded-2xl px-2 py-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                    <Icon className="size-4 text-slate-600" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-6 text-slate-700">
                      <span className="font-semibold text-slate-950">
                        {activity.actorName}
                      </span>{" "}
                      {getActivityDescription(activity)}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {formatRelativeTime(activity.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
