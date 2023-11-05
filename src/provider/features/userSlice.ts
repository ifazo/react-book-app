import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  user: string | null;
}

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
