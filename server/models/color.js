import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
});

const ColorModel = mongoose.model("color", schema);

export { ColorModel };
