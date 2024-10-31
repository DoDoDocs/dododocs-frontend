import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    email: '',
    nickname: '',
    realName: '',
    phoneNumber: '',
    roadAddress: '',
    zipCode: '',
    detailAddress: '',
    gender: '',
    role: 'GUEST',
    searchValue: '',
  },
  isInitialized: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      state.isInitialized = true;
    },
    updateUser: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      state.isInitialized = false;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;

export const selectIsUserInitialized = (rootState) => rootState.user.isInitialized;

export const selectUserData = (rootState) => rootState.user.userData;

export const selectUserRole = (rootState) => rootState.user.userData.role;
export const selectUserName = (rootState) => rootState.user.userData.realName;
export const selectUserSearchValue = (rootState) => rootState.user.userData.searchValue;
