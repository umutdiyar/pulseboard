"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { leads as initialLeads } from "@/data/leads-data";
import { projects as initialProjects } from "@/data/projects-data";
import { tasks as initialTasks } from "@/data/tasks-data";
import { teamMembers as initialMembers } from "@/data/team-data";

import type { Lead, Project, Task, TeamMember } from "@/types/workspace";

type CreateProjectInput = Omit<
  Project,
  "id" | "progress" | "tasks" | "completedTasks"
>;

type CreateTaskInput = Omit<Task, "id">;

type CreateLeadInput = Omit<Lead, "id" | "lastContact">;

type InviteMemberInput = {
  email: string;
  role: "Admin" | "Member";
};

type WorkspaceState = {
  projects: Project[];
  tasks: Task[];
  leads: Lead[];
  members: TeamMember[];

  addProject: (input: CreateProjectInput) => Project;
  addTask: (input: CreateTaskInput) => Task;
  addLead: (input: CreateLeadInput) => Lead;
  inviteMember: (input: InviteMemberInput) => TeamMember;

  resetDemoData: () => void;
};

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      projects: initialProjects,
      tasks: initialTasks,
      leads: initialLeads,
      members: initialMembers,

      addProject: (input) => {
        const project: Project = {
          ...input,
          id: createId("project"),
          progress: 0,
          tasks: 0,
          completedTasks: 0,
        };

        set((state) => ({
          projects: [project, ...state.projects],
        }));

        return project;
      },

      addTask: (input) => {
        const task: Task = {
          ...input,
          id: createId("task"),
        };

        set((state) => ({
          tasks: [task, ...state.tasks],

          projects: state.projects.map((project) =>
            project.name === task.project
              ? {
                  ...project,
                  tasks: project.tasks + 1,
                }
              : project,
          ),
        }));

        return task;
      },

      addLead: (input) => {
        const lead: Lead = {
          ...input,
          id: createId("lead"),
          lastContact: "Az önce",
        };

        set((state) => ({
          leads: [lead, ...state.leads],
        }));

        return lead;
      },

      inviteMember: (input) => {
        const nameFromEmail =
          input.email.split("@")[0]?.replace(/[._-]/g, " ") ?? "Yeni Üye";

        const member: TeamMember = {
          id: createId("member"),
          name: nameFromEmail.replace(/\b\w/g, (char) => char.toUpperCase()),
          email: input.email,
          role: input.role,
          status: "Pending",
          joinedAt: "Davet bekliyor",
        };

        set((state) => ({
          members: [member, ...state.members],
        }));

        return member;
      },

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
      version: 2,
    },
  ),
);
