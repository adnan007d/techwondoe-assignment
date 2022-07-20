import joi from "joi";
import { IReview } from "../../models/ReviewModal";

interface IReviewResult {
  error: boolean;
  response: {
    data: null | IReview;
    message: string;
  };
}

interface IGenerateReviewResult {
  (error: boolean, message: string, data?: null | IReview): IReviewResult;
}

const generateReviewResult: IGenerateReviewResult = (
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

const validateReview = joi.object({
  showId: joi.string().required(),
  reviewText: joi.string().max(255).required(),
  user: joi.any(),
});

export { validateReview, generateReviewResult };
