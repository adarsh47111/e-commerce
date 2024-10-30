import { ColorModel, ProductModel } from "../models/index.js";

export const getAllColors = async (req, res, next) => {
  try {
    const colors = await ColorModel.find();
    res.status(200).json({
      status: "success",
      message: "Fetched all brands successfully",
      data: colors,
    });
  } catch (error) {
    next(error);
  }
};

export const getColors_category = async (req, res, next) => {
  const { category_id } = req.params;
  try {
    const products = await ProductModel.find({ category: category_id });
    const color_ids = [];
    products.forEach((product) => {
      product.colors.forEach(({ color }) => {
        color_ids.push(color);
      });
    });

    const colors = await ColorModel.find(
      {
        _id: { $in: color_ids },
      },
      { __v: 0 }
    );
    res.status(200).json({
      status: "success",
      message: "Fetched all brands successfully",
      data: colors,
    });
  } catch (error) {
    next(error);
  }
};
