import { createSlice } from "@reduxjs/toolkit";
import { IauthModalSlice } from "../../types/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IauthModalSlice = {
  authModalOpen: false,
};
export const authModalSlice = createSlice({
  name: "AuthModal",
  initialState,
  reducers: {
    setAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.authModalOpen = action.payload;
    },
  },
});

export const { setAuthModalOpen } = authModalSlice.actions;

export default authModalSlice.reducer;
