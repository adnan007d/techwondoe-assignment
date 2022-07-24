import { Schema, models, model } from "mongoose";

export interface IRating {
  userId: string;
  showId: string;
  rating: number;
  _id?: string;
}

const ratingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    showId: {
      type: Schema.Types.ObjectId,
      ref: "shows",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      max: 5,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default models.ratings || model<IRating>("ratings", ratingSchema);
