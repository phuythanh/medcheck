import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN_KEY } from 'app/apis/common/constants';
import { decodedToken } from 'app/utils/token';
interface IAuth {
  email: string;
  expiresIn: number | null;
}
const tokenInfo = decodedToken(localStorage.getItem(ACCESS_TOKEN_KEY) || '');
const initialState: IAuth = {
  email: tokenInfo?.email || '',
  expiresIn: tokenInfo?.exp || null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToken: (state, action) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, action.payload.token);
      const tokenInfo = decodedToken(action.payload.token);
      state.email = action.payload.email;
      state.expiresIn = tokenInfo.exp;
    },
    logout: (state) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, '');
      state.email = '';
      state.expiresIn = null;
    },
  },
});

export const { addToken, logout } = authSlice.actions;
export const authorized = (state: any) => state.auth.expiresIn && state.auth.expiresIn > new Date().getTime() / 1000;
export const emailLoggedIn = (state: any) => state.auth.email;
export default authSlice.reducer;
