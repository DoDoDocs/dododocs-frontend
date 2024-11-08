import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/authStore.js';
import { userAPI } from '../api/index.js';

//인증관련 비지니스 로직을 담당하는 hook
// React-query의 useQueryClient와 Zustand의 store 연결
export function useAuth() {
  // React Query의 클라이언트 인스턴스에 접근
  const queryClient = useQueryClient();
  // Zustand의 store의 액션들을 가져옴
  const { setAuth, clearAuth } = useAuthStore();

  // 로그인 함수
  const login = async (email, password) => {
    try {
      // API 호출
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const { token, user } = await response.json();
      // Zustand store에 인증 정보 저장
      setAuth(token, user);

      // 로그인 성공 후 필요한 사용자 데이터를 미리 가져옴 (UX 향상)
      await queryClient.prefetchQuery({
        queryKey: ['user', 'profile'],
        //TODO
        queryFn: () => userAPI.getProfile(user.id),
      });
    } catch (error) {
      throw error;
    }
  };
  // 로그아웃 함수
  const logout = () => {
    // Zustand store 초기화
    clearAuth();
    // React Query 캐시 초기화
    queryClient.clear();
  };

  return { login, logout };
}
