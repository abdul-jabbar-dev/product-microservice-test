import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const categorySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
categorySchema.plugin(mongooseUniqueValidator);
const Category = mongoose.model("Category", categorySchema);
export default Category;
