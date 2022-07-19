import { Schema, models, model } from "mongoose";
import { IUser } from "./UserModal";

export interface IShow {
  userId: string;
  title: string;
  streamingApp: string;
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

export default models.shows || model("shows", showSchema);
