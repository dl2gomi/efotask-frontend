import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse, UserState } from '../../interfaces';

// Initialize state
const initialState: UserState = {
  name: undefined,
  email: undefined,
  token: undefined,
  timestamp: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.token = action.payload.token;
      state.timestamp = new Date().getTime();
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.timestamp = action.payload.timestamp;
    },
    setName: (state, action: PayloadAction<any>) => {
      state.name = action.payload.name;
    },
    clearUser: (state) => {
      state.name = undefined;
      state.email = undefined;
      state.token = undefined;
      state.timestamp = undefined;
    },
  },
});

export const { login, setUser, setName, clearUser } = userSlice.actions;

export default userSlice.reducer;
