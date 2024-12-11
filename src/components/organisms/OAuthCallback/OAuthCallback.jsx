import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth.js';
import useAuthStore from '../../../store/authStore.js';
import { authAPI } from '../../../api/index.js';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { error } = useAuthStore();
  const processedRef = useRef(false); // 처리 여부를 추적하는 ref

  useEffect(() => {
    const processCallback = async () => {
      // 이미 처리되었다면 early return
      if (processedRef.current) return;

      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      console.log(`⭐️ 코드 가져오기 성공 code : `, code);

      if (code) {
        processedRef.current = true; // 처리 시작 전 플래그 설정
        const success = await login(code);

        if (success) {
          const returnUrl = localStorage.getItem('returnUrl') || '/';
          localStorage.removeItem('returnUrl');
          navigate('/', { replace: true });
        } else {
          // navigate('/', { replace: true });
        }
      }
    };

    processCallback();
  }, [login, navigate]);

  if (error) return <div>Error: {error}</div>;
  return <div>Processing login...</div>;
};

export default OAuthCallback;