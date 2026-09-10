import { includesSearchValue } from "@/lib/filters/query-utils";

import type { TeamMember, TeamRole, TeamStatus } from "@/types/workspace";

type TeamFilters = {
  search?: string;
  role?: string;
  status?: string;
};

export function filterMembers(members: TeamMember[], filters: TeamFilters) {
  const { search = "", role = "", status = "" } = filters;

  return members.filter((member) => {
    const matchesSearch =
      includesSearchValue(member.name, search) ||
      includesSearchValue(member.email, search);

    const matchesRole = !role || member.role === (role as TeamRole);

    const matchesStatus = !status || member.status === (status as TeamStatus);

    return matchesSearch && matchesRole && matchesStatus;
  });
}
