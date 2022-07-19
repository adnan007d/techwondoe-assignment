import joi from "joi";
import { IShow } from "../../models/ShowModal";

const validateShow = joi.object({
  title: joi.string().required(),
  streamingApp: joi.string().required(),
  imageURL: joi.string(),
  user: joi.any(),
  _id: joi.optional(),
});

interface IShowResult {
  error: boolean;
  response: {
    data: null | IShow;
    message: string;
  };
}

interface IGenerateShowResult {
  (error: boolean, message: string, data?: null | IShow): IShowResult;
}

const generateShowResult: IGenerateShowResult = (
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

export { validateShow, generateShowResult };
