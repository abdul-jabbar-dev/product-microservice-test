import mongoose, { Schema } from "mongoose";
import mongooseUniqevValidator from "mongoose-unique-validator";
mongoose.set("strictQuery", true);

const UserModel: Schema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: {type: String, index: {unique: true, dropDups: true}},
    password: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);
UserModel.plugin(mongooseUniqevValidator)
const User = mongoose.model("User", UserModel);
export default User;
