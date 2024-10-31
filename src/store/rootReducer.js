import { combineReducers } from '@reduxjs/toolkit';
import { sessionSlice } from '../entities/session/index.js';
import { userSlice } from '../entities/user/index.js';
export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});
