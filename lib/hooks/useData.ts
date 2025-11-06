import { useQuery } from "@tanstack/react-query";
import type { MenuItem } from "@/types/docdata.model";
import type { DocFrontMatter } from "@/types/mdx.model";

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

async function fetchDocsFromAPI(): Promise<DocFrontMatter[]> {
  const response = await fetch("/api/docs");
  if (!response.ok) {
    throw new Error("Failed to fetch docs");
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

// docs 데이터 Hook
export function useDocsList() {
  return useQuery({
    queryKey: ["docs"],
    queryFn: fetchDocsFromAPI,
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

// 특정 문서 Hook (필요시)
export function useSingleDoc(id: string) {
  const { data: docs } = useDocsList();

  return {
    data: docs?.find((doc) => doc.notionId === id),
    isLoading: !docs,
  };
}
