import { createSlice } from "@reduxjs/toolkit";
import { IThemeModeSlice } from "../../types/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IThemeModeSlice = {
  themeMode: "dark",
};

export const themeModeSlice = createSlice({
  name: "ThemeMode",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<string>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
