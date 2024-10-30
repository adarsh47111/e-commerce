import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategories,
} from "../controllers/index.js";

const router = express.Router();

router.post("", createCategory);
router.get("", getAllCategories);
router.post("/list", getCategories);

export default router;
