import axios from 'axios';
import useAuthStore from '../store/authStore.js';

// Axios 인스턴스 생성
const api = axios.create({
  // API 기본 URL 설정 (환경 변수 사용)
  baseURL: process.env.REACT_APP_API_BASE_URL,
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정 (인증 토큰 추가)
// 모든 요청에 대해 실행
api.interceptors.request.use(
  (config) => {
    // Zustand 스토어에서 현재 저장된 JWT토큰 값 가져오기
    const token = useAuthStore.getState().token;
    if (token) {
      // 토큰이 있다면 요청 헤더에 추가
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found. Authorization header will not be set.');

      // 여기서 추가로 할 수 있는 작업
      // 1. 특정 API 요청 차단
      // 2. 로그인 페이지로 리다이렉트 -> 수행
      // 3. 기본 상태로 처리 등
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터: 에러 처리
api.interceptors.response.use(
  (response) => {
    return response; // 성공적인 응답은 그대로 반환
  },
  (error) => {
    //401에러 처리
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Token expired or invalid.');

      // 1. Zustand 스토어 초기화
      useAuthStore.getState().clearAuth(); // 토큰 및 사용자 정보 초기화
      //TODO window.location 수정
      // 2. 로그인 페이지로 리다이렉트
      // window.location.href = '/login'; // 로그인 페이지로 이동
    }
    console.error(error);

    return Promise.reject(error); // 다른 오류는 그대로 반환
  },
);

export default api;
