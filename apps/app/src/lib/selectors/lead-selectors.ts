import { includesSearchValue } from "@/lib/filters/query-utils";

import type { Lead, LeadPriority, LeadStage } from "@/types/workspace";

type LeadFilters = {
  search?: string;
  stage?: string;
  priority?: string;
  owner?: string;
};

export function filterLeads(leads: Lead[], filters: LeadFilters) {
  const { search = "", stage = "", priority = "", owner = "" } = filters;

  return leads.filter((lead) => {
    const matchesSearch =
      includesSearchValue(lead.name, search) ||
      includesSearchValue(lead.company, search) ||
      includesSearchValue(lead.email, search);

    const matchesStage = !stage || lead.stage === (stage as LeadStage);

    const matchesPriority =
      !priority || lead.priority === (priority as LeadPriority);

    const matchesOwner = !owner || lead.owner === owner;

    return matchesSearch && matchesStage && matchesPriority && matchesOwner;
  });
}
