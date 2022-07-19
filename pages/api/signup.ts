import dbConnect from "../../db-config/mongoConfig";
import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../api-logic/models/UserModal";
import { createUser } from "../../api-logic/controllers/user/createUser";
import { validateUser } from "../../api-logic/controllers/user/userUtil";

type Data = {
  message: string;
  data?: IUser;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  const body: IUser = req.body;

  const validate = validateUser.validate(body);

  if (validate.error) {
    return res.status(400).json({
      message: validate.error.message,
    });
  }

  const { error, response } = await createUser({
    username: body.username,
    password: body.password,
  });

  if (error)
    return res.status(400).json({
      message: response.message,
    });

  return res.json({
    message: response.message,
    data: body,
  });
}
