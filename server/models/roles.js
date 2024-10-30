import mongoose from "mongoose";

const schema = new mongoose.Schema({
  role_name: { type: String, enum: ["Admin", "Customer"], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
});

const RoleModel = mongoose.model("role", schema);

export { RoleModel };
