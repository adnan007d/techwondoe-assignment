import { Schema, models, model } from "mongoose";
import userSchema, { IUser } from "./UserModal";
import ratingSchema from "./RatingModal";
import reviewSchema from "./ReviewModal";
export interface IShow {
  _id?: string;
  userId: string;
  title: string;
  streamingApp: string;
  imageURL?: string;
  ratings?: [
    {
      userId: IUser;
      stars: number;
    }
  ];
  reviews?: [
    {
      userId: IUser;
      reviewText: string;
    }
  ];
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
