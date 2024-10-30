import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  // categories: { type: [{ type: String }], default: [] },
});

const BrandModel = new mongoose.model("brand", schema);

export { BrandModel };
