import express from "express";
import { getAllColors, getColors_category } from "../controllers/index.js";

const router = express.Router();

router.get("", getAllColors);
router.get("/category/:category_id", getColors_category);

export default router;
