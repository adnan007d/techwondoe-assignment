import { Schema, models, model } from "mongoose";
import { IUser } from "./UserModal";

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
    ref: "users",
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
      ref: "ratings",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
});

export default models.shows || model<IShow>("shows", showSchema);
