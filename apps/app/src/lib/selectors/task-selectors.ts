import { includesSearchValue } from "@/lib/filters/query-utils";

import type { Task, TaskPriority } from "@/types/workspace";

type TaskFilters = {
  search?: string;
  project?: string;
  priority?: string;
  assignee?: string;
};

export function filterTasks(tasks: Task[], filters: TaskFilters) {
  const { search = "", project = "", priority = "", assignee = "" } = filters;

  return tasks.filter((task) => {
    const matchesSearch =
      includesSearchValue(task.title, search) ||
      includesSearchValue(task.description, search);

    const matchesProject = !project || task.project === project;

    const matchesPriority =
      !priority || task.priority === (priority as TaskPriority);

    const matchesAssignee = !assignee || task.assignee === assignee;

    return (
      matchesSearch && matchesProject && matchesPriority && matchesAssignee
    );
  });
}
