import dbConnect from "../../db-config/mongoConfig";
import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../api-logic/models/UserModal";
import { getUser } from "../../api-logic/controllers/user/getUser";
import jwt from "jsonwebtoken";
import { validateUser } from "../../api-logic/controllers/user/userValidater";

type Data = {
  message: string;
  token?: string;
};

const jwtSecret = process.env.SECRET;

if (!jwtSecret) console.error("JWT Secret is empty", jwtSecret);

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

  const { error, response } = await getUser({
    username: body.username,
    password: body.password,
  });

  if (error) {
    return res.status(400).json({
      ...response,
    });
  }

  const token = jwt.sign(
    {
      user: response.data.username,
    },
    jwtSecret!,
    { expiresIn: "8h" }
  );

  res.status(200).json({
    token: token,
    message: "Login Successful",
  });
}