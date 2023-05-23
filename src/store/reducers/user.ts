import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id?: string;
  nickname?: string;
  tag?: string;
  avatar?: string;

}

const initialState: UserState = {
  id: undefined,
  nickname: undefined,
  tag: undefined,
  avatar: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
    resetUserInfo() {
      return initialState;
    },
  },
});

export const { setUserInfo, resetUserInfo } = userSlice.actions;
export default userSlice.reducer;
