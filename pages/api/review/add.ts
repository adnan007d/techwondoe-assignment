import type { NextApiRequest, NextApiResponse } from "next";
import { addReview } from "../../../api-logic/controllers/reviews/addReview";
import { validateReview } from "../../../api-logic/controllers/reviews/reviewUtil";
import { IReview } from "../../../api-logic/models/ReviewModal";
import withAuth from "../../../middleware/withAuth";

type Data = {
  data?: IReview | null;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const body = req.body;

  const { error: validateError } = validateReview.validate(req.body);
  if (validateError) {
    return res.status(400).json({ message: validateError.message });
  }

  const { error, response } = await addReview(body.user._id, body);

  if (error) {
    return res.status(400).json({ message: response.message });
  }

  return res.status(201).json({
    ...response,
  });
};

export default withAuth(handler);
