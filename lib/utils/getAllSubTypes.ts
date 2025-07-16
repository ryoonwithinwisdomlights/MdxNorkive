import { allRecords } from "content-collections";

export function getAllSubTypes() {
  const allTypes = allRecords.flatMap((record) => record.sub_type ?? []);
  return [...new Set(allTypes)].sort();
}
