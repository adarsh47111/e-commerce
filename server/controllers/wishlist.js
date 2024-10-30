import { CartModel, WishlistModel } from "../models/index.js";
import { CustomErrorHandler } from "../services/CustomErrorHandler.js";

export const getAllProducts = async (req, res, next) => {
  const user_id = req.user._id;

  try {
    let products = await WishlistModel.find(
      { user_id },
      { user_id: 0, __v: 0 }
    ).populate("product");

    const productsPromises = products.map(async (ele) => {
      const cartItem_id = await CartModel.findOne({
        user_id,
        product: ele.product._id,
      });

      return {
        ...ele._doc,
        product: {
          ...ele._doc.product._doc,
          wishlistItem_id: ele._id,
          cartItem_id: cartItem_id ? cartItem_id._id : null,
        },
      };
    });

    products = await Promise.all(productsPromises);

    res.status(200).json({
      status: "success",
      message: "Fetched all products successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  const user_id = req.user._id;
  const { product_id } = req.body;

  try {
    const wishlist = await WishlistModel.findOne({
      user_id,
      product: product_id,
    });

    if (wishlist) {
      return res.status(400).json({
        status: "error",
        message: "Product already exists in wishlist",
      });
    }

    const newWishlist = new WishlistModel({ user_id, product: product_id });
    await newWishlist.save();

    res.status(201).json({
      status: "success",
      message: "Product added to wishlist successfully",
      data: { _id: newWishlist._id },
    });
  } catch (error) {
    next(error);
  }
};

export const addMultipleProducts = async (req, res, next) => {
  const user_id = req.user._id;
  const { product_ids } = req.body;

  try {
    const wishlist = await WishlistModel.find({
      user_id,
      product: { $in: product_ids },
    });

    if (wishlist.length !== 0) {
      return res.status(400).json({
        status: "error",
        message: "Product already exists in wishlist",
      });
    }

    const promises = product_ids.map(async (id) => {
      const newWishlist = new WishlistModel({ user_id, product: id });
      await newWishlist.save();
    });

    await Promise.all(promises);

    res.status(201).json({
      status: "success",
      message: "Products added to wishlist successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { wishlistItem_id } = req.params;

  try {
    const wishlist = await WishlistModel.findOneAndDelete({
      _id: wishlistItem_id,
    });
    if (!wishlist) {
      return next(CustomErrorHandler.notFound("Product not found in wishlist"));
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted from wishlist successfully",
    });
  } catch (error) {
    next(error);
  }
};
