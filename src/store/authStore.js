import { create } from 'zustand';
import { combine, persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { userAPI } from '../api';

/**
 * 초기 상태 정의
 */
const initialState = {
  token: null, // JWT 토큰
  user: null, // 사용자 정보
  isAuthenticated: false, // 로그인 여부
  isInitialized: false, // 앱 초기화 상태
  error: null, // 에러 상태
};

/**
 * Zustand Store for Authentication
 * @returns {useAuthStore}
 * React Query와 함꼐 사용하여 최소한의 인증만 관리.
 * 실제 사용자 데이터와 관련된 API호출은 React Query에서 처리.
 */
const useAuthStore = create(
  devtools(
    persist(
      combine(
        initialState,
        //액션 정의
        (set, get) => ({
          // 로그인 성공시 호출되는 액션
          setAuth: (accessToken) =>
            set(
              {
                token: accessToken,
                user: null,
                isAuthenticated: true,
                isInitialized: true,
                error: null,
              },
              false,
              'setAuth',
            ),

          // 로그아웃 성공시 호출되는 액션
          clearAuth: () =>
            set(
              {
                ...initialState,
                isInitialized: true,
              },
              false,
              'clearAuth',
            ),

          // 초기 인증 상태 체크
          checkInitialAuth: async () => {
            try {
              const token = get().token;

              if (!token) {
                set(
                  {
                    ...initialState,
                    isInitialized: true,
                    error: '토큰이 없습니다.',
                  },
                  false,
                  'checkInitialAuth/noToken',
                );
                return;
              }

              //TODO: 사용자 정보 조회 구현
              // const userData = await userAPI.getProfile();
              // set({
              //   token,
              //   user: userData,
              //   isAuthenticated: true,
              //   isInitialized: true,
              //   error: null,
              // }, false, 'checkInitialAuth/success');
            } catch (error) {
              console.error('Auth initialization failed:', error);
              set(
                {
                  ...initialState,
                  isInitialized: true,
                  error: '인증에 실패했습니다.(토큰 존재 , 초기화완료)',
                },
                false,
                'checkInitialAuth/error',
              );
            }
          },

          // 에러 상태 설정
          setError: (error) => set({ error }, false, 'setError'),
        }),
      ),
      {
        name: 'dododocs-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    {
      name: 'Auth Store',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);

export default useAuthStore;
