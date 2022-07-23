import { createSlice } from "@reduxjs/toolkit";
import type { IShowPopulated } from "../../api-logic/models/ShowModal";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ShowsState {
  shows: IShowPopulated[];
}

const initialState: ShowsState = {
  shows: [],
};

export const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    setShows: (state, action: PayloadAction<IShowPopulated[]>) => {
      // console.log(action.payload);
      state.shows = action.payload;
    },
  },
});

export const { setShows } = showsSlice.actions;

export const selectShows = (state: RootState) => state.shows.shows;

export default showsSlice.reducer;
