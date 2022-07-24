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

export { getShows };
