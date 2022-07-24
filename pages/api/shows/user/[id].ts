import type { NextApiRequest, NextApiResponse } from "next";
import { getShowsByUser } from "../../../../api-logic/controllers/shows/getShows";
import { IShowPopulated } from "../../../../api-logic/models/ShowModal";
import withAuth from "../../../../middleware/withAuth";

type Data = IShowPopulated[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const userId = req.query.id as string;

  return res
    .status(200)
    .json((await getShowsByUser(userId!)) as IShowPopulated[]);
};

export default withAuth(handler);
