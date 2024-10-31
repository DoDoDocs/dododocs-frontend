import _ from '../../../config/config.js';
import { notification } from 'antd';

/**
 * @description 카카오 로그인
 * @returns {Promise<Object>} 로그인 결과
 */
const getKakaoLogin = async () => {
  try {
    const response = await fetch(`${_.SERVER_URL}/oauth2/authorization/kakao`, {
      method: 'GET',
    });

    if (response.status === 500) {
      throw new Error('Server error');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    console.log('response', response);
    return await response.json();
  } catch (error) {
    handleLoginError(error);
    throw error; // 에러를 상위로 전파
  }
};

/**
 * 로그인 에러 처리
 * @param {Error|Object} error - 에러 객체
 */
const handleLoginError = (error) => {
  const errorMessage = error.error?.message || error.message || 'Unknown error occurred';
  const errorStatus = error.error?.status || error.status || 'Unknown status';

  notification.error({
    message: '카카오 로그인 실패 ❌',
    description: errorMessage,
    duration: 2,
  });

  console.error('카카오 로그인 실패 ❌', {
    message: errorMessage,
    status: errorStatus,
    code: error.error?.code,
  });

  if (errorStatus === 401) {
    window.location.replace(_.HOST_URL + '/');
  }
};

export default getKakaoLogin;
