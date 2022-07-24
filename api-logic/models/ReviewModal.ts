import { Schema, models, model } from "mongoose";

export interface IReview {
  userId: string;
  showId: string;
  reviewText: string;
  _id?: string;
}

const reviewSchema = new Schema(
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
    reviewText: {
      type: String,
      required: true,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

export default models.reviews || model<IReview>("reviews", reviewSchema);
