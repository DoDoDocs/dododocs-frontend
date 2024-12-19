// /src/App.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import DododocsRouter from './router/index.jsx';
import AppInitializer from './components/core/AppInitalizer.jsx';
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
  return (
    <QueryClientProvider client={queryClient}>
      <AppInitializer>
        <DododocsRouter />
      </AppInitializer>
    </QueryClientProvider>
  );
}

export default App;
