import mongoose from "mongoose";

const orderStatusEnum = {
  values: ["Pending", "Shipped", "Delivered"],
  message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
};

const OrderSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: { type: Number, required: true },
    }],
    status: { type: String, enum: orderStatusEnum, required: true,default: "PENDING" },
    total: { type: Number, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);
const Order = mongoose.model("Order", OrderSchema);
export default Order;
