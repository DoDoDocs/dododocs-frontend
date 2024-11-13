import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth.js';
import useAuthStore from '../../../store/authStore.js';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { handleCallback } = useAuth();
  const { error } = useAuthStore();

  useEffect(() => {
    const processCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      console.log(`⭐️ 코드 가져오기 성공 code : `, code);
      if (code) {
        const success = await handleCallback(code);
        if (success) {
          const returnUrl = localStorage.getItem('returnUrl') || '/';
          localStorage.removeItem('returnUrl');
          navigate('/', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }
    };

    processCallback();
  }, [handleCallback, navigate]);

  if (error) return <div>Error: {error}</div>;
  return <div>Processing login...</div>;
};

export default OAuthCallback;