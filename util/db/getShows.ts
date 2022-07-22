import authAxios from "../authAxios";

export interface IUser {
  _id: string;
  username: string;
}

export interface IShow {
  _id?: string;
  userId: string;
  title: string;
  streamingApp: string;
  imageURL?: string;
  ratings?: [
    {
      userId: IUser;
      stars: number;
    }
  ];
  reviews?: [
    {
      userId: IUser;
      reviewText: string;
    }
  ];
}

const getShows = async (): Promise<IShow[]> => {
  try {
    return await (
      await authAxios.get("/api/shows")
    ).data;
  } catch (err) {
    throw err;
  }
};

export { getShows };
