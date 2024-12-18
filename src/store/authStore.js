import { create } from 'zustand';
import { combine, persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import jwtUtils from '../utils/jwtUtils';

/**
 * 초기 상태 정의
 */
const initialState = {
  token: null, // JWT 토큰
  isAuthenticated: false, // 로그인 여부
  isInitialized: false, // 앱 초기화 상태
  authError: null, // 에러 상태
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
                isAuthenticated: true,
                isInitialized: true,
                authError: null,
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
              // 1. 토큰 존재 여부 확인
              console.log('checkInitialAuth : 🏃 1. 토큰 존재 여부 확인 시작');
              if (!token) {
                set(
                  {
                    ...initialState,
                    isInitialized: true,
                    authError: '토큰이 없습니다.',
                  },
                  false,
                  'checkInitialAuth/noToken',
                );
                return;
              }

              // 2. 토큰 디코딩 및 유효성 검사
              console.log('checkInitialAuth : 🏃 2. 토큰 디코딩 및 유효성 검사 시작');
              try {
                const decodedToken = jwtUtils.decode(token);
                const isValid = jwtUtils.isTokenValid(decodedToken);

                if (!isValid) {
                  // 토큰이 만료되었거나 유효하지 않은 경우
                  localStorage.removeItem('dododocs-storage'); // persist 저장소 초기화
                  set(
                    {
                      ...initialState,
                      isInitialized: true,
                      authError: '토큰이 만료되었습니다.',
                    },
                    false,
                    'checkInitialAuth/invalidToken',
                  );
                  return;
                }

                set(
                  {
                    token,
                    isAuthenticated: true,
                    isInitialized: true,
                    authError: null,
                  },
                  false,
                  'checkInitialAuth/success',
                );
              } catch (tokenError) {
                // 토큰 디코딩/검증 실패
                localStorage.removeItem('dododocs-storage');
                set(
                  {
                    ...initialState,
                    isInitialized: true,
                    authError: '유효하지 않은 토큰입니다.',
                  },
                  false,
                  'checkInitialAuth/tokenError',
                );
              }
            } catch (error) {
              console.error('Auth initialization failed:', error);
              set(
                {
                  ...initialState,
                  isInitialized: true,
                  authError: '인증에 실패했습니다.(토큰 존재 , 초기화완료)',
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
