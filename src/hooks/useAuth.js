// src/hooks/useAuth.js
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/authStore.js';
import { authAPI } from '../api/index.js';

//인증관련 비지니스 로직을 담당하는 hook
// React-query의 useQueryClient와 Zustand의 store 연결
export function useAuth() {
  // React Query의 클라이언트 인스턴스에 접근
  const queryClient = useQueryClient();
  // Zustand의 store의 액션들을 가져옴
  const { setAuth, clearAuth, setError } = useAuthStore();

  /**
   * @desc 로그인 함수 - 로그인 버튼 클릭시 호출됨
   * git OAuth 페이지로 리다이렉션
   */
  const login = async () => {
    try {
      // API 호출
      const { oauthUri } = await authAPI.getOAuthLink();
      console.log(oauthUri);

      if (!oauthUri) throw new Error('Login failed: git oAuth uri 못가져옴');

      // 현재 URL을 state로 저장하여 나중에 돌아올 수 있도록 함
      const returnUrl = window.location.href;
      localStorage.setItem('returnUrl', returnUrl);

      // 외부 OAuth 페이지로 리다이렉션
      window.location.href = oauthUri;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  /**
   * @desc OAuth 콜백 처리
   */
  const handleCallback = async (code) => {
    try {
      // API 호출
      // 인증 코드로 액세스 토큰 받기
      console.log(`🏃 accessToken가져오기`);

      const { accessToken } = await authAPI.login(code);
      console.log(accessToken);
      console.log(`⭐️ 토큰 가져오기 성공 token : `, accessToken);

      // 토큰 저장 및 인증 상태 업데이트
      // setAuth(accessToken);

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  // 로그아웃 함수
  const logout = () => {
    // Zustand store 초기화
    clearAuth();
    // React Query 캐시 초기화
    queryClient.clear();
  };

  return { login, logout, handleCallback };
}
