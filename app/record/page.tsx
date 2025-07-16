"use client";
import Link from "next/link";
import { allRecords } from "content-collections";
import { getAllSubTypes } from "@/lib/utils/getAllSubTypes";
import { useParams, useSearchParams } from "next/navigation";
// // 전체 글 목록 + 필터링 UI
export default function RecordsPage() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("sub_type");
  const allSubTypes = getAllSubTypes();
  const filtered = selected
    ? allRecords.filter((entry) => entry.sub_type?.includes(selected))
    : allRecords;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">📚 모든 기록들</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {["All", ...allSubTypes].map((type) => {
          const isSelected = selected === type || (!selected && type === "All");
          const href = type === "All" ? "/record" : `/record?sub_type=${type}`;
          return (
            <Link
              key={type}
              href={href}
              className={`px-3 py-1 rounded-full border text-sm ${
                isSelected
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {type}
            </Link>
          );
        })}
      </div>

      <ul className="space-y-4">
        {filtered.map((entry) => (
          <li key={entry.slug}>
            <Link href={`${entry.slug}`}>
              <div className="font-semibold hover:underline">{entry.title}</div>
              <div className="text-sm">{entry.slug}</div>
              <div className="text-sm text-gray-500">
                {new Date(entry.date).toLocaleDateString()} · {entry.sub_type}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
