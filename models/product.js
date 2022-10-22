import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    requied: true,
  },
  uuidProduct: {
    type: String,
    requied: true,
  },
  categoryProduct: {
    type: String,
    requied: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});
const product = mongoose.model("Product", productSchema);
export default product;