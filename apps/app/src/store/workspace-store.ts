"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { leads as initialLeads } from "@/data/leads-data";
import { projects as initialProjects } from "@/data/projects-data";
import { tasks as initialTasks } from "@/data/tasks-data";
import { teamMembers as initialMembers } from "@/data/team-data";

import type {
  Lead,
  Project,
  Task,
  TeamMember,
  Activity,
} from "@/types/workspace";

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
  activities: Activity[];

  addProject: (input: CreateProjectInput) => Project;
  addTask: (input: CreateTaskInput) => Task;
  addLead: (input: CreateLeadInput) => Lead;
  inviteMember: (input: InviteMemberInput) => TeamMember;

  moveTask: (taskId: string, status: Task["status"]) => void;
  moveLead: (leadId: string, status: Lead["stage"]) => void;

  resetDemoData: () => void;
};

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const MAX_ACTIVITY_COUNT = 50;
function createActivity(input: Omit<Activity, "id" | "createdAt">): Activity {
  return {
    ...input,
    id: createId("activity"),
    createdAt: new Date().toISOString(),
  };
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      projects: initialProjects,
      tasks: initialTasks,
      leads: initialLeads,
      members: initialMembers,
      activities: [],
      addProject: (input) => {
        const project: Project = {
          ...input,
          id: createId("project"),
          progress: 0,
          tasks: 0,
          completedTasks: 0,
        };

        const activity = createActivity({
          actorName: "Umut Diyar",
          action: "created",
          entityType: "project",
          entityId: project.id,
          entityName: project.name,
        });

        set((state) => ({
          projects: [project, ...state.projects],
          activities: [activity, ...state.activities].slice(
            0,
            MAX_ACTIVITY_COUNT,
          ),
        }));

        return project;
      },

      addTask: (input) => {
        const task: Task = {
          ...input,
          id: createId("task"),
        };

        const activity = createActivity({
          actorName: "Umut Diyar",
          action: "created",
          entityType: "task",
          entityId: task.id,
          entityName: task.title,
        });

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
          activities: [activity, ...state.activities].slice(
            0,
            MAX_ACTIVITY_COUNT,
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

        const activity = createActivity({
          actorName: "Umut Diyar",
          action: "created",
          entityType: "lead",
          entityId: lead.id,
          entityName: lead.name,
        });

        set((state) => ({
          leads: [lead, ...state.leads],
          activities: [activity, ...state.activities].slice(
            0,
            MAX_ACTIVITY_COUNT,
          ),
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

        const activity = createActivity({
          actorName: "Umut Diyar",
          action: "invited",
          entityType: "member",
          entityId: member.id,
          entityName: member.name,
        });

        set((state) => ({
          members: [member, ...state.members],
          activities: [activity, ...state.activities].slice(
            0,
            MAX_ACTIVITY_COUNT,
          ),
        }));

        return member;
      },

      moveTask: (taskId, status) => {
        set((state) => {
          const task = state.tasks.find((item) => item.id === taskId);

          if (!task) {
            return state;
          }

          if (task.status === status) {
            return state;
          }

          const previousStatus = task.status;

          const activity = createActivity({
            actorName: "Umut Diyar",
            action: "status_changed",
            entityType: "task",
            entityId: task.id,
            entityName: task.title,

            metadata: {
              from: previousStatus,
              to: status,
            },
          });

          return {
            tasks: state.tasks.map((item) =>
              item.id === taskId
                ? {
                    ...item,
                    status,
                  }
                : item,
            ),

            activities: [activity, ...state.activities].slice(
              0,
              MAX_ACTIVITY_COUNT,
            ),
          };
        });
      },

      moveLead: (leadId, stage) => {
        set((state) => {
          const lead = state.leads.find((item) => item.id === leadId);

          if (!lead) {
            return state;
          }

          if (lead.stage === stage) {
            return state;
          }

          const previousStage = lead.stage;

          const activity = createActivity({
            actorName: "Umut Diyar",
            action: "status_changed",
            entityType: "lead",
            entityId: lead.id,
            entityName: lead.name,

            metadata: {
              from: previousStage,
              to: stage,
            },
          });

          return {
            leads: state.leads.map((item) =>
              item.id === leadId
                ? {
                    ...item,
                    stage,
                  }
                : item,
            ),

            activities: [activity, ...state.activities].slice(
              0,
              MAX_ACTIVITY_COUNT,
            ),
          };
        });
      },

      resetDemoData: () => {
        set({
          projects: initialProjects,
          tasks: initialTasks,
          leads: initialLeads,
          members: initialMembers,
          activities: [],
        });
      },
    }),
    {
      name: "pulseboard-workspace-data",
      version: 3,
    },
  ),
);
