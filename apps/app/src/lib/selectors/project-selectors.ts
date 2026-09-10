import { includesSearchValue } from "@/lib/filters/query-utils";

import type { Project, ProjectStatus } from "@/types/workspace";

type ProjectFilters = {
  search?: string;
  status?: string;
  owner?: string;
};

export function filterProjects(projects: Project[], filters: ProjectFilters) {
  const { search = "", status = "", owner = "" } = filters;

  return projects.filter((project) => {
    const matchesSearch =
      includesSearchValue(project.name, search) ||
      includesSearchValue(project.description, search) ||
      includesSearchValue(project.owner, search);

    const matchesStatus =
      !status || project.status === (status as ProjectStatus);

    const matchesOwner = !owner || project.owner === owner;

    return matchesSearch && matchesStatus && matchesOwner;
  });
}
