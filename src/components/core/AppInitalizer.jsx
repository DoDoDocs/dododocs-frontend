// src/components/core/AppInitializer.jsx

import { useEffect } from 'react';
import useAuthStore from '../../store/authStore';
import { useUser } from '../../hooks/useUser';

const AppInitializer = ({ children }) => {
  const {
    isInitialized, // 앱 초기화 상태
    checkInitialAuth, // 초기화 함수
    authError, // 에러 상태
  } = useAuthStore();
  const { isUserDataLoading, userDataError, isUserDataSuccess } = useUser();

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


  // 초기화 상태 로깅
  useEffect(() => {
    if (!isInitialized) {
      console.log('🏃🏃앱 초기화 : 앱 초기화 중...');
    }
    if (isUserDataLoading) {
      console.log('🏃🏃앱 초기화 : 사용자 데이터 로딩 중...');
    }
    if (userDataError) {
      console.log(`🏃🏃앱 초기화 : ❌ ${userDataError}`);
    }
    if (authError) {
      console.log(`🏃🏃앱 초기화 : ❌ ${authError}`);
    }
    if (isUserDataSuccess) {
      console.log('🏃🏃앱 초기화 : 사용자 데이터 로딩 완료');
    }
  }, [
    isInitialized,
    isUserDataLoading,
    userDataError,
    authError,
    isUserDataSuccess,
  ]);


  return children;

}

export default AppInitializer;