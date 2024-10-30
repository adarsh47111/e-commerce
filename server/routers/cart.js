import express from "express";
import {
  addProduct,
  deleteMultipleProducts,
  deleteProduct,
  getAllProducts,
  updateQuantity,
} from "../controllers/cart.js";
const router = express.Router();

router.get("", getAllProducts);
router.post("", addProduct);
router.delete("/item/:cartItem_id", deleteProduct);
router.delete("/items", deleteMultipleProducts);
router.put("/:cartItem_id/quantity", updateQuantity);

export default router;
