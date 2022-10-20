import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    requied: true,
  },
  uuidCategory: {
    type: String,
    requied: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});
const category = mongoose.model("Category", categorySchema);
export default category;