import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  // product_variant_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "ProductVariants",
  //   default: null,
  // },
});

const WishlistModel = mongoose.model("wishlist", schema);

export { WishlistModel };
