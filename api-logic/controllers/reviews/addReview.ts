import ReviewSchema, { IReview } from "../../models/ReviewModal";
import ShowSchema from "../../models/ShowModal";
import { getShowById } from "../shows/getShows";
import { generateReviewResult } from "./reviewUtil";

const addReviewImpl = async (userId: string, review: IReview) => {
  const showDoc = await getShowById(review.showId);

  if (!showDoc) {
    return generateReviewResult(true, "Show Not Found");
  }

  const query = {
    userId,
    showId: review.showId,
  };

  const update = {
    userId,
    showId: review.showId,
    reviewText: review.reviewText,
  };

  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };

  const ReviewDoc = await ReviewSchema.findOneAndUpdate(query, update, options);
  await ShowSchema.findByIdAndUpdate(review.showId, {
    $addToSet: {
      reviews: ReviewDoc._id,
    },
  });
  return generateReviewResult(false, "Review Added", ReviewDoc);
};

const addReview = async (userId: string, review: IReview) => {
  try {
    return await addReviewImpl(userId, review);
  } catch (err) {
    console.error(err);
    return generateReviewResult(true, "Something went wrong");
  }
};

export { addReview };
