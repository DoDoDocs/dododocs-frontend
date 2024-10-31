import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  // 개발 환경에서만 Redux DevTools를 활성화합니다.
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
