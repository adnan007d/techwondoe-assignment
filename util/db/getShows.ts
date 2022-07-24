import type { IShowPopulated } from "../../api-logic/models/ShowModal";
import authAxios from "../authAxios";

const getShows = async (): Promise<IShowPopulated[]> => {
  try {
    return await (
      await authAxios.get("/api/shows")
    ).data;
  } catch (err) {
    throw err;
  }
};

const getShowsByUser = async (id: string): Promise<IShowPopulated[]> => {
  try {
    return await (
      await authAxios.get(`/api/shows/user/${id}`)
    ).data;
  } catch (err) {
    throw err;
  }
};

export { getShows, getShowsByUser };
