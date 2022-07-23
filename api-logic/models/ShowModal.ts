import { Schema, models, model } from "mongoose";
import userSchema, { IUser } from "./UserModal";
import ratingSchema, { IRating } from "./RatingModal";
import reviewSchema, { IReview } from "./ReviewModal";
export interface IShow {
  _id?: string;
  userId: string;
  title: string;
  streamingApp: string;
  imageURL?: string;
  ratings?: string[];
  reviews?: string[];
}

export interface IShowPopulated
  extends Omit<IShow, "userId" | "ratings" | "reviews"> {
  userId: IUser;
  ratings: IRating[];
  reviews: IReview[];
}

const showSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: userSchema.modelName,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  streamingApp: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    default:
      "https://dominionmartialarts.com/wp-content/uploads/2017/04/default-image.jpg",
  },
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: ratingSchema.modelName,
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: reviewSchema.modelName,
    },
  ],
});

export default models.shows || model<IShow>("shows", showSchema);
