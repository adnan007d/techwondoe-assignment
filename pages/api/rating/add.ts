// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addRating } from "../../../api-logic/controllers/rating/addRating";
import { validateRating } from "../../../api-logic/controllers/rating/ratingUtil";
import { IRating } from "../../../api-logic/models/RatingModal";
import withAuth from "../../../middleware/withAuth";

type Data = {
  data?: IRating | null;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const body = req.body;

  const { error: validateError } = validateRating.validate(req.body);
  if (validateError) {
    return res.status(400).json({ message: validateError.message });
  }

  const { error, response } = await addRating(body.user._id, body);

  if (error) {
    return res.status(400).json({ message: response.message });
  }

  return res.status(201).json({
    ...response,
  });
};

export default withAuth(handler);
