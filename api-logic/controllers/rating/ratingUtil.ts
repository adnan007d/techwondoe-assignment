import joi from "joi";
import { IRating } from "../../models/RatingModal";

interface IRatingResult {
  error: boolean;
  response: {
    data: null | IRating;
    message: string;
  };
}

interface IGenerateRatingResult {
  (error: boolean, message: string, data?: null | IRating): IRatingResult;
}

const generateRatingResult: IGenerateRatingResult = (
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

const validateRating = joi.object({
  showId: joi.string().required(),
  rating: joi.number().min(1).max(5).required(),
  user: joi.any(),
});

export { validateRating, generateRatingResult };
