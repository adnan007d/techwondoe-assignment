import RatingSchema from "../../models/RatingModal";
import ShowSchema from "../../models/ShowModal";
import { generateRatingResult } from "./ratingUtil";

const removeRatingImpl = async (userId: string, ratingId: string) => {
  const RatingDoc = await RatingSchema.findOneAndDelete({
    _id: ratingId,
    userId,
  });

  if (!RatingDoc) {
    return generateRatingResult(true, "Rating Not Found");
  }

  await ShowSchema.updateOne(
    {
      _id: RatingDoc.showId,
    },
    // HELP: I don't know why this is happening but the code is working and if you remove @ts-ignore the static analyzer complains
    // @ts-ignore
    {
      $pull: {
        ratings: ratingId,
      },
    }
  );
  return generateRatingResult(false, "Rating Removed", RatingDoc);
};

const removeRating = async (userId: string, ratingId: string) => {
  try {
    return await removeRatingImpl(userId, ratingId);
  } catch (err) {
    console.error(err);
    return generateRatingResult(true, "Something went wrong");
  }
};

export { removeRating };
