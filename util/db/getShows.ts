import type { IShowPopulated } from "../../api-logic/models/ShowModal";
import authAxios from "../authAxios";

export interface IUser {
  _id: string;
  username: string;
}

const getShows = async (): Promise<IShowPopulated[]> => {
  try {
    return await (
      await authAxios.get("/api/shows")
    ).data;
  } catch (err) {
    throw err;
  }
};

export { getShows };
