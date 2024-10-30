import { BrandModel, ProductModel } from "../models/index.js";

// sends all brand associated with a category

export const getAllBrands = async (req, res, next) => {
  try {
    const brands = await BrandModel.find();
    res.status(200).json({
      status: "success",
      message: "Fetched all brands successfully",
      data: brands,
    });
  } catch (error) {
    next(error);
  }
};

export const getBrands_category = async (req, res, next) => {
  const { category_id } = req.params;
  try {
    const products = await ProductModel.find({ category: category_id });
    const brand_ids = products.map((product) => {
      return product.brand;
    });

    const brands = await BrandModel.find(
      {
        _id: { $in: brand_ids },
      },
      { categories: 0, __v: 0 }
    );
    res.status(200).json({
      status: "success",
      message: "Fetched all brands successfully",
      data: brands,
    });
  } catch (error) {
    next(error);
  }
};
