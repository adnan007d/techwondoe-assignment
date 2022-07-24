import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IUser } from "../../api-logic/models/UserModal";

export interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

// declare module "jsonwebtoken" {
//   export interface JwtPayload {
//     user: string;
//   }
// }

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
