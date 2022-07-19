import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import userSchema from "../api-logic/models/UserModal";

import jwt from "jsonwebtoken";
import dbConnect from "../db-config/mongoConfig";

const jwtSecret = process.env.SECRET;

declare module "jsonwebtoken" {
  export interface JwtPayload {
    user: string;
  }
}

const withAuth = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];
    await dbConnect();
    try {
      const decoded = jwt.verify(token!, jwtSecret!);

      if (typeof decoded !== "string") {
        req.body.user = await userSchema.findOne({
          username: decoded.user,
        });
      }

      return handler(req, res);
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "UnAuthorized" });
    }
  };
};

export default withAuth;
