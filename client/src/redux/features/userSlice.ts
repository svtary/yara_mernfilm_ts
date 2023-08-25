import { createSlice } from "@reduxjs/toolkit";
import { IUserSlice } from "../../types/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserSlice = {
  user: null,
  listFavorites: [],
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token)
          localStorage.setItem("actkn", action.payload.token);
      }

      state.user = action.payload;
    },
    setListFavorites: (state, action: PayloadAction<any>) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action: PayloadAction<any>) => {
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },
    addFavorite: (state, action: PayloadAction<any>) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});

export const { setUser, setListFavorites, addFavorite, removeFavorite } =
  userSlice.actions;

export default userSlice.reducer;
