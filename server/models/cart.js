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
  color: {
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "color",
      required: true,
    },
    price: { type: Number },
    quantity: { type: Number },
  },
  // variant: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "product_variant",
  // },
  // product_variant: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "product_variant",
  //   default: null,
  // },
  quantity: { type: Number, required: true },
});

const CartModel = mongoose.model("cart", schema);

export { CartModel };
