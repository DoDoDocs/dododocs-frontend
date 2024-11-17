import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuthStore from './store/authStore';

import './App.css';
import DododocsRouter from './router/index.jsx';

// React Query 클라이언트 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 데이터가 5분 동안은 "fresh"하다고 간주
      // staleTime: 1000 * 60 * 5,

      // API 호출 실패시 1번만 재시도
      retry: 0,
      // 브라우저 창이 다시 포커스될 때 자동으로 데이터를 다시 불러오지 않음
      refetchOnWindowFocus: false,
      // 네트워크가 다시 연결될 때 자동으로 재시도
      refetchOnReconnect: true,
    },
  },
});

function App() {
  const {
    isInitialized, // 앱 초기화 상태
    checkInitialAuth, // 초기화 함수
    error, // 에러 상태
  } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      // 토큰이 있고 아직 초기화되지 않았을 때만 실행
      if (!isInitialized) {
        try {
          await checkInitialAuth();
        } catch (error) {
          console.error('토큰은 있으나 인증 초기화 실패:', error);
        }
      }
    };

    initializeAuth();
  }, [isInitialized, checkInitialAuth]);

  // 앱이 초기화되지 않았을 때 로딩 표시
  if (!isInitialized) {
    console.log('🏃🏃 앱 초기화 중...');
    // return <div>Loading...</div>;
  }

  //TODO notification으로 변경
  // 인증 관련 에러가 있을 때 에러 메시지 표시
  if (error) {
    console.log(`❌ ${error}`);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <DododocsRouter />
    </QueryClientProvider>
  );
}

export default App;
