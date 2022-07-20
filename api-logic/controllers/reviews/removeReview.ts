import ReviewSchema from "../../models/ReviewModal";
import ShowSchema from "../../models/ShowModal";
import { generateReviewResult } from "./reviewUtil";

const removeReviewImpl = async (userId: string, reviewId: string) => {
  const ReviewDoc = await ReviewSchema.findOneAndDelete({
    _id: reviewId,
    userId,
  });

  if (!ReviewDoc) {
    return generateReviewResult(true, "Review Not Found");
  }

  await ShowSchema.updateOne(
    {
      _id: ReviewDoc.showId,
    },
    // HELP: I don't know why this is happening but the code is working and if you remove @ts-ignore the static analyzer complains
    // @ts-ignore
    {
      $pull: {
        reviews: reviewId,
      },
    }
  );
  return generateReviewResult(false, "Review Removed", ReviewDoc);
};

const removeReview = async (userId: string, reviewId: string) => {
  try {
    return await removeReviewImpl(userId, reviewId);
  } catch (err) {
    console.error(err);
    return generateReviewResult(true, "Something went wrong");
  }
};

export { removeReview };
