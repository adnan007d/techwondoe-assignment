// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createShow } from "../../../api-logic/controllers/shows/createShow";
import { validateShow } from "../../../api-logic/controllers/shows/showUtil";
import { updateShow } from "../../../api-logic/controllers/shows/updateShow";
import { IShow } from "../../../api-logic/models/Shows";
import withAuth from "../../../middleware/withAuth";

type Data = {
  data?: IShow | null;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const body = req.body;

  const { error: validateError } = validateShow.validate(req.body);
  if (validateError) {
    return res.status(400).json({ message: validateError.message });
  }

  const { error, response } = await updateShow(body.user._id, body);

  if (error) {
    return res.status(400).json({ message: response.message });
  }

  return res.status(201).json({
    ...response,
  });
};

export default withAuth(handler);
