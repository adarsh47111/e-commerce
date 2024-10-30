import express from "express";
import {
  addMultipleProducts,
  addProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/wishlist.js";

const router = express.Router();

router.get("", getAllProducts);
router.post("", addProduct);
router.post("/items", addMultipleProducts);
router.delete("/item/:wishlistItem_id", deleteProduct);

export default router;
