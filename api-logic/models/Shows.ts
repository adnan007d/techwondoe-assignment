import { Schema, models, model } from "mongoose";
import { IUser } from "./UserModal";

export interface IShow {
  _id?: string;
  userId: string;
  title: string;
  streamingApp: string;
  imageURL?: string;
  rating?: [
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
  rating: {
    type: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        stars: {
          type: Number,
          required: true,
          max: 5,
          min: 1,
        },
      },
    ],
  },
  reviews: {
    type: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        reviewText: {
          type: String,
          required: true,
          maxlength: 255,
          minlength: 1,
        },
      },
    ],
  },
});

export default models.shows || model<IShow>("shows", showSchema);
