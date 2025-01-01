import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    categoryId: { type: mongoose.Types.ObjectId,ref:'Category', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Product= mongoose.model("Product", ProductSchema);
export default Product;
