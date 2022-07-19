import RatingSchema, { IRating } from "../../models/RatingModal";
import ShowSchema from "../../models/ShowModal";
import { getShowById } from "../shows/getShows";
import { generateRatingResult } from "./ratingUtil";

const addRatingImpl = async (userId: string, rating: IRating) => {
  const showDoc = await getShowById(rating.showId);

  if (!showDoc) {
    return generateRatingResult(true, "Show Not Found");
  }

  const query = {
    userId,
    showId: rating.showId,
  };

  const update = {
    userId,
    showId: rating.showId,
    rating: rating.rating,
  };

  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };

  const RatingDoc = await RatingSchema.findOneAndUpdate(query, update, options);
  await ShowSchema.findByIdAndUpdate(rating.showId, {
    $addToSet: {
      ratings: RatingDoc._id,
    },
  });
  return generateRatingResult(false, "Rating Added", RatingDoc);
};

const addRating = async (userId: string, rating: IRating) => {
  try {
    return await addRatingImpl(userId, rating);
  } catch (err) {
    console.error(err);
    return generateRatingResult(true, "Something went wrong");
  }
};

export { addRating };
