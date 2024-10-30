import { CartModel } from "../models/index.js";
import { CustomErrorHandler } from "../services/CustomErrorHandler.js";

export const getAllProducts = async (req, res, next) => {
  const user_id = req.user._id;

  try {
    let cart = await CartModel.find(
      { user_id },
      { user_id: 0, __v: 0 }
    ).populate("product");

    res.status(200).json({
      status: "success",
      message: "Fetched all products successfully",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  const user_id = req.user._id;
  const { product_id, color, quantity } = req.body;

  try {
    const cart = await CartModel.findOne({
      user_id,
      product: product_id,
      color,
    });

    if (cart) {
      return res.status(400).json({
        status: "error",
        message: "Product already exists in cart",
      });
    }

    const newCartItem = new CartModel({
      user_id,
      product: product_id,
      quantity,
      color,
    });
    await newCartItem.save();

    res.status(201).json({
      status: "success",
      message: "Product added to wishlist successfully",
      data: { _id: newCartItem._id },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { cartItem_id } = req.params;

  try {
    const wishlist = await CartModel.findOneAndDelete({
      _id: cartItem_id,
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

export const deleteMultipleProducts = async (req, res, next) => {
  const user_id = req.user._id;
  const { cartItem_ids } = req.body;

  try {
    const cart = await CartModel.deleteMany({
      _id: { $in: cartItem_ids },
      user_id,
    });
    if (!cart) {
      return next(CustomErrorHandler.notFound("Product not found in cart"));
    }
    res.status(200).json({
      status: "success",
      message: "Products deleted from cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuantity = async (req, res, next) => {
  const user_id = req.user._id;
  const { cartItem_id } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await CartModel.findOneAndUpdate(
      { _id: cartItem_id, user_id },
      { quantity },
      { new: true }
    );
    if (!cart) {
      return next(CustomErrorHandler.notFound("Product not found in cart"));
    }

    res.status(200).json({
      status: "success",
      message: "Quantity updated successfully",
      data: { quantity: cart.quantity },
    });
  } catch (error) {
    next(error);
  }
};
