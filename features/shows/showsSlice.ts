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

const findShow = (arr: IShowPopulated[], showId: string): number => {
  return arr.findIndex((show) => show._id === showId); // never be -1 as the show exists
};

const setCurrentShowState = (state: ShowsState, idx: number) => {
  if (state.shows[idx]) state.currentShow = state.shows[idx];
  else {
    state.currentShow = state.shows[state.shows.length - 1];
  }
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
      let idx = findShow(temp, action.payload.showId);
      if (idx === -1) {
        temp.push(state.currentShow!);

        idx = 0;
      }
      temp[idx].ratings = temp[idx].ratings.filter(
        (rating) => rating._id !== action.payload._id
      );

      state.shows = [...temp];
      setCurrentShowState(state, idx);
    },
    addRating: (state, action) => {
      const temp = state.shows;
      let idx = findShow(temp, action.payload.showId);
      if (idx === -1) {
        temp.push(state.currentShow!);

        idx = 0;
      }
      const ratingIndex = temp[idx].ratings.findIndex(
        (rating) => rating._id === action.payload._id
      );
      if (ratingIndex === -1) {
        temp[idx].ratings.push(action.payload);
      } else {
        temp[idx].ratings[ratingIndex] = action.payload;
      }
      state.shows = [...temp];
      setCurrentShowState(state, idx);
    },

    setCurrentShow: (state, action) => {
      state.currentShow = action.payload;
    },
    removeShow: (state, action) => {
      state.shows = state.shows.filter((show) => show._id !== action.payload);
    },
    updateShow: (state, action) => {
      const temp = state.shows;
      const idx = findShow(temp, action.payload._id);
      if (idx === -1) {
        temp.push(action.payload);
      } else {
        temp[idx] = {
          ...action.payload,
        };
      }
      state.shows = [...temp];
    },
    addShow: (state, action) => {
      state.shows = [...state.shows, action.payload];
    },
    updateReview: (state, action) => {
      const temp = state.shows;
      let idx = findShow(temp, action.payload.showId);
      if (idx === -1) {
        temp.push(state.currentShow!);
        idx = 0;
      }
      const reviewIndex = temp[idx].reviews.findIndex(
        (review) => review._id === action.payload._id
      );
      if (reviewIndex === -1) {
        temp[idx].reviews.push(action.payload);
      } else {
        temp[idx].reviews[reviewIndex] = action.payload;
      }
      state.shows = [...temp];
      setCurrentShowState(state, idx);
    },
    removeReview: (state, action) => {
      const temp = state.shows;
      let idx = findShow(temp, action.payload.showId);
      if (idx === -1) {
        temp.push(state.currentShow!);

        idx = 0;
      }
      temp[idx].reviews = temp[idx].reviews.filter(
        (review) => review._id !== action.payload._id
      );
      state.shows = [...temp];
      setCurrentShowState(state, idx);
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
  updateReview,
  removeReview,
} = showsSlice.actions;

export const selectShows = (state: RootState) => state.shows.shows;
export const selectCurrentShow = (state: RootState) => state.shows.currentShow;

export default showsSlice.reducer;
