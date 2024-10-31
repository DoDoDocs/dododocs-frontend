import { jwtDecode } from 'jwt-decode';
import { notification } from 'antd';

const TOKEN_KEY = 'golla-golla';

const jwtUtils = {
  /**
   * @description 토큰까기
   * @param  {string}  token
   */
  decode(token) {
    return jwtDecode(token);
  },

  /**
   * @description 토큰의 유효시간 체크
   * @param  {string}  token
   */
  checkTokenExpiry(token) {
    const decodedToken = this.decode(token);
    if (!decodedToken) return false;
    return decodedToken.exp * 1000;
  },

  /**
   * @description 토큰 유효시간으로 유효한지 확인
   * @param {string} decodedToken
   */
  isTokenValid(decodedToken) {
    if (!decodedToken) return false;
    const expireDate = decodedToken.exp * 1000;
    return expireDate > Date.now();
  },

  /**
   * @description 유효시간 확인 -> 유효 : true / 유효x : false
   */
  async verifyToken() {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error('Token does not exist');
      }

      const decodedToken = this.decode(token);
      if (!this.isTokenValid(decodedToken)) {
        throw new Error('Token has expired');
      }

      return token;
    } catch (error) {
      this.handleTokenError(error);
      throw error;
    }
  },

  handleTokenError(error) {
    console.error('Token verification failed:', error.message);

    localStorage.removeItem(TOKEN_KEY);

    notification.error({
      message: '로그인에 실패하였습니다.',
      description: '다시 시도해주세요',
      duration: 2,
    });
  },
};

export default jwtUtils;
