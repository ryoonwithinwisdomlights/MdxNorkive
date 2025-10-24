import { useQuery } from "@tanstack/react-query";
import type { MenuItem } from "@/types/recorddata.model";
import type { RecordFrontMatter } from "@/types/mdx.model";

/**
 * 최소한의 React Query Hook들
 * API Route를 통해 서버 사이드에서 데이터 가져오기
 */

// API 호출 함수들
async function fetchMenuFromAPI(): Promise<MenuItem[]> {
  const response = await fetch("/api/menu");
  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }
  return response.json();
}

async function fetchRecordsFromAPI(): Promise<RecordFrontMatter[]> {
  const response = await fetch("/api/records");
  if (!response.ok) {
    throw new Error("Failed to fetch records");
  }
  return response.json();
}

// 메뉴 데이터 Hook
export function useMenuList() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenuFromAPI,
    staleTime: 10 * 60 * 1000, // 10분간 fresh 상태 유지
  });
}

// 레코드 데이터 Hook
export function useRecords() {
  return useQuery({
    queryKey: ["records"],
    queryFn: fetchRecordsFromAPI,
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
  });
}

// 특정 메뉴 항목 Hook (필요시)
export function useMenuItem(id: string) {
  const { data: menuList } = useMenuList();

  return {
    data: menuList?.find((item) => item.id === id),
    isLoading: !menuList,
  };
}

// 특정 레코드 Hook (필요시)
export function useRecord(id: string) {
  const { data: records } = useRecords();

  return {
    data: records?.find((record) => record.notionId === id),
    isLoading: !records,
  };
}
