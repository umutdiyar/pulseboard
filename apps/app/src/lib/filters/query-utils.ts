export function normalizeSearchValue(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR");
}

export function includesSearchValue(
  source: string | null | undefined,
  query: string,
) {
  if (!query) {
    return true;
  }

  if (!source) {
    return false;
  }

  return normalizeSearchValue(source).includes(normalizeSearchValue(query));
}
