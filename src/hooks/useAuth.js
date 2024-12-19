// src/hooks/useAuth.js
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/authStore.js';
import { authAPI } from '../api/index.js';
import { useUser } from './useUser.js';
import { resetAllStores } from '../utils/storeUtils.js';

//인증관련 비지니스 로직을 담당하는 hook
// React-query의 useQueryClient와 Zustand의 store 연결
export function useAuth() {
  // React Query의 클라이언트 인스턴스에 접근
  const queryClient = useQueryClient();
  // Zustand의 store의 액션들을 가져옴
  const { setAuth, setError } = useAuthStore();
  const { refresh: refreshUserData } = useUser();

  /**
   * @desc GitHub OAuth 로그인 시작
   * git OAuth 페이지로 리다이렉션
   */
  const oAuthLogin = async () => {
    try {
      // OAuth URI 요청
      const { oauthUri } = await authAPI.getOAuthLink();
      console.log('⭐️ OAuth URI 가져오기 성공:', oauthUri);

      if (!oauthUri) throw new Error('OAuth URI를 가져오지 못했습니다');

      // 현재 URL 저장
      const returnUrl = window.location.href;
      localStorage.setItem('returnUrl', returnUrl);

      // GitHub OAuth 페이지로 리다이렉션
      window.location.href = oauthUri;
    } catch (error) {
      console.error('OAuth 로그인 시작 실패:', error);
      setError(error.message);
      throw error;
    }
  };

  /**
   * @desc 로그인 프로세스 전체 처리 (OAuth 콜백 + 사용자 정보 조회)
   * handleCallback + getUserInfo 호출
   */
  const login = async (code) => {
    try {
      // 1. 인증 코드로 액세스 토큰 받기
      console.log('🏃 로그인 :  액세스 토큰 요청 시작');
      const { accessToken } = await authAPI.login(code);
      console.log('⭐️ 액세스 토큰 받기 성공:', accessToken);

      // 2. 토큰 저장 및 인증 상태 업데이트
      setAuth(accessToken);

      // 3. React Query를 통해 사용자 정보와 레포지토리 정보 조회
      console.log('🏃 로그인 : 사용자 데이터 조회 시작');
      await refreshUserData();
      console.log('⭐️ 로그인 : 사용자 데이터 조회 완료');

      return true;
    } catch (error) {
      console.error('🏃 로그인 : ❌ 로그인 프로세스 실패:', error);
      setError(error.message);
      return false;
    }
  };

  // 로그아웃 함수
  const logout = () => {
    // Zustand 모든 store 초기화
    resetAllStores();
    // 로컬 스토리지 클리어
    localStorage.clear();
    // React Query 캐시 초기화
    queryClient.clear();
  };

  return { oAuthLogin, login, logout };
}
