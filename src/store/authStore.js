// src/store/authStore.js
import { create } from 'zustand';
import { combine, persist, createJSONStorage } from 'zustand/middleware';
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
  persist(
    //새로고침시에도 상태 유지.
    combine(
      initialState,

      //액션 정의
      (set, get) => ({
        // 로그인 성공시 호출되는 액션
        setAuth: (accessToken) => {
          set({
            token: accessToken,
            user: null,
            isAuthenticated: true, // 인증 상태를 true로
            isInitialized: true, // 앱도 초기화 완료
            error: null,
          });
        },
        // 로그아웃 성공시 호출되는 액션
        clearAuth: () => {
          set({
            ...initialState,
            isInitialized: true, // 로그아웃해도 앱 초기화 상태는 유지
          });
        },

        // 초기 인증 상태 체크
        checkInitialAuth: async () => {
          try {
            // 현재 저장된 토큰 가져오기
            const token = get().token;

            // 토큰이 없는 경우
            if (!token) {
              set({
                ...initialState,
                isInitialized: true, // 초기화는 완료 처리
                error: '토큰이 없습니다.',
              });
              return;
            }

            //토큰이 있는 경우
            // 토큰으로 사용자 정보 가져오기
            //TODO
            // const userData = await userAPI.getProfile();

            // set({
            //   token,
            //   user: userData,
            //   isAuthenticated: true, // 유효한 토큰으로 인증됨
            //   isInitialized: true, // 앱 초기화 완료
            //   error: null,
            // });
          } catch (error) {
            console.error('Auth initialization failed:', error);
            // 에러 발생시 인증 정보 초기화
            set({
              ...initialState,
              isInitialized: true, // 초기화는 완료 처리
              error: '인증에 실패했습니다.(토큰 존재 , 초기화완료)',
            });
          }
        },

        // 에러 상태 설정
        setError: (error) => set({ error }),
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
