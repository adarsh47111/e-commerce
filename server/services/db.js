import mongoose from "mongoose";
import { DB_URL } from "../config/index.js";

const connectDb = () => {
  mongoose
    .connect(`${DB_URL}`)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log("Error connecting", err));
};

export default connectDb;
