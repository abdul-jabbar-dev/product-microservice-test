import mongoose, { Schema } from "mongoose";
import validator from "validator";
import Hashed from "../utils/Hashed";
import ENV from "../config";

const UserModel: Schema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Invalid email address"],
      index: { unique: true, dropDups: true },
    },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "active", "deactive"],
      default: "pending",
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);
UserModel.pre("save", async function (next) {
  try {
    const existingUser = await User.findOne({ email: this.email });
    if (existingUser) {
      return next({
        message: "User already exist",
        name: "Duplicate entity",
      });
    }

    this.password = await Hashed.encrypt(
      this.password as string,
      ENV.SOLT_ROUNDS
    );
  } catch (error) {
    next({
      message: (error as Error).message,
      name: "",
    });
  }
});
const User = mongoose.model("User", UserModel);
export default User;
