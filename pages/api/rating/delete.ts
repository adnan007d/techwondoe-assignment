import { NextApiRequest, NextApiResponse } from "next";
import { removeRating } from "../../../api-logic/controllers/rating/removeRating";
import { IRating } from "../../../api-logic/models/RatingModal";
import withAuth from "../../../middleware/withAuth";

type Data = {
  data?: IRating;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = req.body;

  if (!body.id) {
    return res.status(400).json({ message: "Invalid Rating Id" });
  }

  const { error, response } = await removeRating(body.user.id, body.id);

  if (error) {
    return res.status(400).json({ message: response.message });
  }

  return res.json({
    message: response.message,
  });
};

export default withAuth(handler);
