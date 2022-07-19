import type { NextApiRequest, NextApiResponse } from "next";
import withAuth from "../../../middleware/withAuth";
import { IShow } from "../../../api-logic/models/ShowModal";
import { getShows } from "../../../api-logic/controllers/shows/getShows";

type Data = IShow[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  return res.status(200).json((await getShows()) as IShow[]);
};

export default withAuth(handler);
