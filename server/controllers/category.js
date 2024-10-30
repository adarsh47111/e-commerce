import { z } from "zod";
import {
  BrandModel,
  CategoryModel,
  ColorModel,
  ProductModel,
} from "../models/index.js";
import { CustomErrorHandler } from "../services/CustomErrorHandler.js";
import product from "../../client/src/redux/slices/product.js";

export const createCategory = async (req, res, next) => {
  //------------------------validation--------------------------------
  const schema = z.object({
    name: z.string(),
    description: z.string().optional(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) return next(result.error);

  const { name, description } = req.body;

  try {
    const categoryExists = await CategoryModel.findOne({ name });
    if (categoryExists)
      return next(new CustomErrorHandler(400, "Category already exists"));

    await CategoryModel.create({
      name,
      description,
    });

    res.status(201).json({
      status: "success",
      message: "Category created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find()
      .select({ __v: 0 })
      .sort({ name: 1 });

    res.status(200).json({
      status: "success",
      message: "Fetched all categories successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  const { categoryList } = req.body;

  try {
    const categories = await CategoryModel.find({
      name: { $in: categoryList },
    }).select({ _id: 1, name: 1 });

    res.status(200).json({
      status: "success",
      message: "Fetched all categories successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};