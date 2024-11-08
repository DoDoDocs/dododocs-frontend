import { create } from 'zustand';
import { combine, persist, createJSONStorage } from 'zustand/middleware';
import { userAPI } from '../api';
/**
 * Zustand Store for Authentication
 * @returns {useAuthStore}
 * React Query와 함꼐 사용하여 최소한의 인증만 관리.
 * 실제 사용자 데이터와 관련된 API호출은 React Query에서 처리.
 */
const useAuthStore = create(
  persist(
    //새로고침시에도 상태 유지.
    combine(
      {
        //초기상태정의
        token: null, // JWT토큰
        user: null, // 사용자 정보
        isAuthenticated: false, // 로그인 여부
        isInitialized: false, // 앱 초기화 여부
        error: null, // 에러 상태
      },

      //액션 정의
      (set) => ({
        // 로그인 성공시 호출되는 액션
        setAuth: (token, user) => {
          set({
            token,
            user,
            isAuthenticated: true,
          });
        },
        // 로그아웃 성공시 호출되는 액션
        clearAuth: () => {
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          });
        },

        // 에러 상태 설정
        setError: (error) => set({ error }),

        // 초기 인증 상태 체크
        checkInitialAuth: async () => {
          try {
            // 현재 저장된 토큰 가져오기
            const token = useAuthStore.getState().token;

            if (!token) {
              set({ isInitialized: true });
              return;
            }

            // 토큰으로 사용자 정보 가져오기
            const userData = await userAPI.getProfile();

            set({
              user: userData,
              isInitialized: true,
              error: null,
            });
          } catch (error) {
            console.error('Auth check failed:', error);
            // 에러 발생시 인증 정보 초기화
            set({
              token: null,
              user: null,
              isInitialized: true,
              error: '인증에 실패했습니다.',
            });
          }
        },
      }),
    ),
    {
      // persist 미들웨어 설졍
      name: 'dododocs-storage', // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // 저장소 지정
      partialize: (state) => ({
        // 저장될 상태 객체 지정
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
