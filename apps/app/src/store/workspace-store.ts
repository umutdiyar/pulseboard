"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { leads as initialLeads } from "@/data/leads-data";
import { projects as initialProjects } from "@/data/projects-data";
import { tasks as initialTasks } from "@/data/tasks-data";
import { teamMembers as initialMembers } from "@/data/team-data";

import type { Lead, Project, Task, TeamMember } from "@/types/workspace";

type WorkspaceState = {
  projects: Project[];
  tasks: Task[];
  leads: Lead[];
  members: TeamMember[];

  resetDemoData: () => void;
};

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      projects: initialProjects,
      tasks: initialTasks,
      leads: initialLeads,
      members: initialMembers,

      resetDemoData: () => {
        set({
          projects: initialProjects,
          tasks: initialTasks,
          leads: initialLeads,
          members: initialMembers,
        });
      },
    }),
    {
      name: "pulseboard-workspace-data",
      version: 1,
    },
  ),
);
