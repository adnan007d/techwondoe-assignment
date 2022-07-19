import joi from "joi";
import { IShow } from "../../models/ShowModal";

const validateShow = joi.object({
  title: joi.string().required(),
  streamingApp: joi.string().required(),
  imageURL: joi.string(),
  user: joi.any(),
  _id: joi.optional(),
  // userId: joi.string().required(),
  // rating: joi.array().items(
  //   joi.object({
  //     userId: joi.string().required(),
  //     stars: joi.number().max(5).min(1).required(),
  //   })
  // ),
  // reviews: joi.array().items(
  //   joi.object({
  //     userId: joi.string().required(),
  //     reviewText: joi.string().min(1).max(255).required(),
  //   })
  // ),
});

interface IUserResult {
  error: boolean;
  response: {
    data: null | IShow;
    message: string;
  };
}

interface IGenerateUserResult {
  (error: boolean, message: string, data?: null | IShow): IUserResult;
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

export { validateShow, generateUserResult };
