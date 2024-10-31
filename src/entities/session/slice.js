import { createSlice } from '@reduxjs/toolkit';
import jwtUtils from '../../utils/jwtUtils.js';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    isInitialized: false,
    token: null,
    expiryTime: null,
  },
  reducers: {
    login: (state, action) => {
      state.isInitialized = true;
      // state.token = action.payload.token;
      // state.expiryTime = jwtUtils.checkTokenExpiry(action.payload.token);
      state.token = null;
      state.expiryTime = null;
    },
    logout: (state) => {
      state.isInitialized = false;
      state.token = null;
      state.expiryTime = null;
    },
  },
});

export const { login, logout } = sessionSlice.actions;

//선택자 함수 정의
export const selectIsUserInitialized = (state) => state.session.isInitialized;
export const selectToken = (state) => state.session.token;
export const selectExpiryTime = (state) => state.session.expiryTime;
