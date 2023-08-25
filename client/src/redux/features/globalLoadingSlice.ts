import { createSlice } from "@reduxjs/toolkit";
import { IGlobalLoadingSlice } from "../../types/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IGlobalLoadingSlice = {
  globalLoading: false,
};
export const globalLoadingSlice = createSlice({
  name: "AuthModal",
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<any>) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
