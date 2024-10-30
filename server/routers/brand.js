import express from "express";
import { getAllBrands, getBrands_category } from "../controllers/index.js";

const router = express.Router();

router.get("", getAllBrands);
router.get("/category/:category_id", getBrands_category);

export default router;
