import type { NextApiRequest, NextApiResponse } from "next";
import withAuth from "../../../middleware/withAuth";
import { IShowPopulated } from "../../../api-logic/models/ShowModal";
import { getShows } from "../../../api-logic/controllers/shows/getShows";

type Data = IShowPopulated[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  return res.status(200).json((await getShows()) as IShowPopulated[]);
};

export default withAuth(handler);
