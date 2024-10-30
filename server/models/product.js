import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [{ type: String, required: true }] },
  quantity: { type: Number },
  colors: {
    type: [
      {
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "color",
          required: true,
        },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
  },

  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  // attributes: {
  //   type: [
  //     {
  //       name: String,
  //       values: [],
  //     },
  //   ],
  // },
  // variants: {
  //   type: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "product_variant",
  //     },
  //   ],
  // },
  status: { type: String, enum: ["active", "inactive"], default: "active" },

  //   rating: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "rating",
  //     required: true,
  //   },

  //   reviews: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "review",
  //     required: true,
  //   },
});

const ProductModel = new mongoose.model("product", schema);

export { ProductModel };
