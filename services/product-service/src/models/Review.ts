import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true, 
    },
    productId: { type: String, required: true, ref: "Products" },
    userId: { type: String, required: true, ref: "Users" },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", ReviewSchema);
export default Review;
