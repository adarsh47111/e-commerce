import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  // product_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "product",
  //   required: true,
  // },
  attributes: {
    type: [
      {
        name: String,
        value: String,
      },
    ],
  },
});

const ProductVariantModel = mongoose.model("product_variant", variantSchema);

export { ProductVariantModel };
