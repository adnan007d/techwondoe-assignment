import joi from "joi";
import { IUser } from "../../models/UserModal";

interface IUserResult {
  error: boolean;
  response: {
    data: null | IUser;
    message: string;
  };
}

interface IGenerateUserResult {
  (error: boolean, message: string, data?: null | IUser): IUserResult;
}

const generateUserResult: IGenerateUserResult = (
  error,
  message,
  data = null
) => {
  return {
    error,
    response: {
      data,
      message,
    },
  };
};

const validateUser = joi.object({
  username: joi.string().min(3).max(20).required(),
  password: joi.string().min(8).required(),
});

export { validateUser, generateUserResult };
