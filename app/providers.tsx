"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // QueryClient를 컴포넌트 내부에서 생성하여 SSR 이슈 방지
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 5분간 fresh 상태 유지
            staleTime: 5 * 60 * 1000,
            // 10분간 캐시 유지
            gcTime: 10 * 60 * 1000,
            // 재시도 비활성화 (Notion API가 느리므로)
            retry: false,
            // 네트워크 재연결 시에만 재시도
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            // 백그라운드에서 자동 갱신 비활성화
            refetchOnMount: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
