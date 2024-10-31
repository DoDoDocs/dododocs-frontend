import { LAYOUT } from './constants.js';

const environmentConfig = {
  development: {
    API_URL: 'http://localhost:8080',
    REDIRECT_URL: 'http://localhost:3000/login',
    ENABLE_LOGS: true,
  },
  production: {
    API_URL: 'https://api.production.com',
    REDIRECT_URL: 'https://app.production.com/login',
    ENABLE_LOGS: false,
  },
};

export const config = {
  ...LAYOUT,
  ...environmentConfig[process.env.NODE_ENV || 'development'],
};

export default config;
