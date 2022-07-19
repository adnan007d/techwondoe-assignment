// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteShow } from "../../../api-logic/controllers/shows/deleteShow";
import { IShow } from "../../../api-logic/models/Shows";
import withAuth from "../../../middleware/withAuth";

type Data = {
  data?: IShow;
  message: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const body = req.body;

  if (!body.id) {
    return res.status(400).json({ message: "Invalid Show Id" });
  }

  const { error, response } = await deleteShow(body.user.id, body.id);

  if (error) {
    return res.status(400).json({ message: response.message });
  }

  return res.status(201).json({
    message: response.message,
  });

  // res.status(200).json({ message: "WooW" });
};

export default withAuth(handler);
