import { NextApiRequest, NextApiResponse } from "next";
import { removeReview } from "../../../api-logic/controllers/reviews/removeReview";
import { IReview } from "../../../api-logic/models/ReviewModal";
import withAuth from "../../../middleware/withAuth";

type Data = {
  data?: IReview;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = req.body;

  if (!body.id) {
    return res.status(400).json({ message: "Invalid Review Id" });
  }

  console.log(body.user.id, body.id);
  const { error, response } = await removeReview(body.user.id, body.id);

  if (error) {
    return res.status(400).json({ message: response.message });
  }

  return res.json({
    message: response.message,
  });
};

export default withAuth(handler);
