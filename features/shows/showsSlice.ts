import { createSlice } from "@reduxjs/toolkit";
import type { IShowPopulated } from "../../api-logic/models/ShowModal";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ShowsState {
  shows: IShowPopulated[];
  currentShow?: IShowPopulated;
}

const initialState: ShowsState = {
  shows: [],
};

export const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    setShows: (state, action: PayloadAction<IShowPopulated[]>) => {
      state.shows = action.payload;
    },
    removeRating: (state, action) => {
      const temp = state.shows;
      const idx = temp.findIndex((show) => show._id === action.payload.showId); // never be -1 as the show exists
      temp[idx].ratings = temp[idx].ratings.filter(
        (rating) => rating._id !== action.payload._id
      );
      state.shows = [...temp];
    },
    addRating: (state, action) => {
      const temp = state.shows;
      const idx = temp.findIndex((show) => show._id === action.payload.showId); // never be -1 as the show exists
      const ratingIndex = temp[idx].ratings.findIndex(
        (rating) => rating._id === action.payload._id
      );
      if (ratingIndex === -1) {
        temp[idx].ratings.push(action.payload);
      } else {
        temp[idx].ratings[ratingIndex] = action.payload;
      }
      state.shows = [...temp];
    },

    setCurrentShow: (state, action) => {
      state.currentShow = action.payload;
    },
    removeShow: (state, action) => {
      state.shows = state.shows.filter((show) => show._id !== action.payload);
    },
    updateShow: (state, action) => {
      const temp = state.shows;
      const idx = temp.findIndex((show) => show._id === action.payload._id); // never be -1 as the show exists
      temp[idx] = {
        ...action.payload,
      };
      state.shows = [...temp];
    },
    addShow: (state, action) => {
      state.shows = [...state.shows, action.payload];
    },
  },
});

export const {
  setShows,
  removeRating,
  addRating,
  setCurrentShow,
  removeShow,
  updateShow,
  addShow,
} = showsSlice.actions;

export const selectShows = (state: RootState) => state.shows.shows;
export const selectCurrentShow = (state: RootState) => state.shows.currentShow;

export default showsSlice.reducer;
