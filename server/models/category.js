import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  // url_slug: { type: String, required: true, unique: true },
  parent_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    default: null,
  },
  child_categories: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        default: null,
      },
    ],
  },

  status: { type: String, enum: ["active", "inactive"], required: true },
});

const CategoryModel = new mongoose.model("category", schema);

export { CategoryModel };
