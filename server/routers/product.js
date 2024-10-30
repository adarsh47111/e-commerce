import express from "express";
import { productController } from "../controllers/index.js";

const router = express.Router();

router.post("", productController.createProduct);
router.get("", productController.getAllProducts);
router.get("/:product_id", productController.getProduct);
router.get("/category/:category_id", productController.getProducts_category);

export default router;
