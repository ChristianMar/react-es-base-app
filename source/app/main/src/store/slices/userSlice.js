import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
