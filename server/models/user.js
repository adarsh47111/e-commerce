import mongoose from "mongoose";

const schema = new mongoose.Schema({
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "inactive", "block"],
    required: true,
  },
});

schema.methods.comparePassword = function (password) {
  if (this.password === password) return true;
  else return false;
};

const UserModel = new mongoose.model("user", schema);
export { UserModel };
