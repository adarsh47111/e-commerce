import { z } from "zod";
import {
  BrandModel,
  CartModel,
  CategoryModel,
  ColorModel,
  ProductModel,
  WishlistModel,
} from "../models/index.js";
import { CustomErrorHandler } from "../services/index.js";

export const productController = {
  async createProduct(req, res, next) {
    //------------------------validation--------------------------------
    const schema = z.object({
      name: z.string(),
      price: z.number(),
      description: z.string(),
      thumbnail: z.string(),
      images: z.array(z.string()),
      category: z.string(),
      brand: z.string(),
      colors: z.array(z.object()),
    });

    const result = schema.safeParse(req.body);
    if (!result.success) return next(result.error);

    const { name, price, description, thumbnail, images, category, brand } =
      req.body;

    try {
      //------------------------ check if category exists--------------------------------
      const categoryDoc = await CategoryModel.findOne({ _id: category });
      if (!categoryDoc)
        return next(new CustomErrorHandler(400, "category is not valid"));

      //------------------------ check if brand exists--------------------------------
      const brandDoc = await BrandModel.findOne({ _id: brand });
      if (!brandDoc)
        return next(new CustomErrorHandler(400, "brand is not valid"));

      //---------------------------------add product -------------------------------------
      const newProduct = await ProductModel.create({
        name,
        price,
        description,
        thumbnail,
        images,
        category: categoryDoc._id,
        brand: brandDoc._id,
        colors,
      });

      res.status(201).json({
        status: "success",
        message: "Product created successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  // async createProduct(req, res, next) {
  //   //------------------------validation--------------------------------
  //   const schema = z.object({
  //     name: z.string(),
  //     price: z.number().nullable(),
  //     quantity: z.number().nullable(),
  //     description: z.string(),
  //     thumbnail: z.string(),
  //     images: z.array(z.string()),
  //     category: z.string(),
  //     brand: z.string(),
  //   });

  //   const result = schema.safeParse(req.body);
  //   if (!result.success) return next(result.error);

  //   const {
  //     name,
  //     price,
  //     quantity,
  //     description,
  //     thumbnail,
  //     images,
  //     category,
  //     brand,
  //     attributes,
  //     variants,
  //   } = req.body;

  //   try {
  //     //------------------------ check if category exists--------------------------------
  //     const categoryDoc = await CategoryModel.findOne({ _id: category });
  //     if (!categoryDoc)
  //       return next(new CustomErrorHandler(400, "Input is not valid"));

  //     //------------------------ check if brand exists--------------------------------
  //     // if yse, the add category_id to brand document
  //     let brandDoc = await BrandModel.findOne({ _id: brand });
  //     /* if (!brandDoc)
  //       return next(new CustomErrorHandler(400, "Input is not valid"));
  //     if (brandDoc) {
  //       const cat_exists = brandDoc.categories.some((cat_id) => {
  //         return cat_id.toString() === categoryDoc._id.toString();
  //       });
  //       if (!cat_exists) brandDoc.categories.push(categoryDoc._id);
  //       await brandDoc.save();
  //     } else
  //       brandDoc = await BrandModel.create({
  //         name: brand,
  //         categories: [categoryDoc._id],
  //       }); */

  //     //-------------------------------add variants ------------------------------
  //     if (variants !== null) {
  //       const variantsPromises = variants.map(async (variant) => {
  //         const variantDoc = await ProductVariantModel.create({
  //           price: variant.price,
  //           quantity: variant.quantity,
  //           attributes: variant.attributes,
  //         });
  //         return variantDoc._id;
  //       });

  //       const variants_ids = await Promise.all(variantsPromises);

  //       //---------------------------------add product -------------------------------------
  //       const newProduct = await ProductModel.create({
  //         name,
  //         price,
  //         quantity,
  //         description,
  //         thumbnail,
  //         images,
  //         category: categoryDoc._id,
  //         brand: brandDoc._id,
  //         attributes,
  //         variants: variants_ids,
  //       });
  //     } else {
  //       const newProduct = await ProductModel.create({
  //         name,
  //         price,
  //         quantity,
  //         description,
  //         thumbnail,
  //         images,
  //         category: categoryDoc._id,
  //         brand: brandDoc._id,
  //         attributes: null,
  //         variants: null,
  //       });
  //     }

  //     res.status(201).json({
  //       status: "success",
  //       message: "Product created successfully",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  async getAllProducts(req, res, next) {
    const isloggedIn = req.headers.x_isloggedin;
    const user_id = req.headers.x_user_id;

    try {
      let products = await ProductModel.find()
        .populate("category")
        .populate("brand")
        .populate({
          path: "colors",
          populate: {
            path: "color",
          },
        });

      if (isloggedIn === "true") {
        const productsPromises = products.map(async (ele) => {
          const wishlistItem_id = await WishlistModel.findOne({
            user_id,
            product: ele._id,
          });
          const cartItem_id = await CartModel.findOne({
            user_id,
            product: ele._id,
          });

          return {
            ...ele._doc,
            wishlistItem_id: wishlistItem_id ? wishlistItem_id._id : null,
            cartItem_id: cartItem_id ? cartItem_id._id : null,
          };
        });

        products = await Promise.all(productsPromises);
      }

      res.status(200).json({
        status: "success",
        message: "Fetched all products successfully",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },

  async getProduct(req, res, next) {
    const isloggedIn = req.headers.x_isloggedin;
    const user_id = req.headers.x_user_id;
    const { product_id } = req.params;

    try {
      let product = await ProductModel.findOne({ _id: product_id })
        .populate("category")
        .populate("brand")
        .populate({
          path: "colors",
          populate: {
            path: "color",
          },
        });

      if (isloggedIn === "true") {
        const wishlistItem_id = await WishlistModel.findOne({
          user_id,
          product: product._id,
        });

        // add cart item is for each color varirant
        const cartItem_ids = await CartModel.find({
          user_id,
          product: product._id,
        });


        const colors = product.colors.map((colorObj) => {
          const cartItem = cartItem_ids.find((item) => {
            const { color, price, quantity } = item.color;
            return (
              color.toString() === colorObj.color._id.toString() &&
              quantity === colorObj.quantity &&
              price === colorObj.price
            );
          });

          return {
            ...colorObj._doc,
            cartItem_id: cartItem ? cartItem._id : null,
          };
        });

        product = {
          ...product._doc,
          wishlistItem_id: wishlistItem_id ? wishlistItem_id._id : null,
          colors,
        };
      }

      res.status(200).json({
        status: "success",
        message: "Fetched product successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  async getProducts_category(req, res, next) {
    const isloggedIn = req.headers.x_isloggedin;
    const user_id = req.headers.x_user_id;
    const { category_id } = req.params;

    try {
      let products = await ProductModel.find({
        category: category_id,
      })
        .populate("category")
        .populate("brand")
        .populate({
          path: "colors",
          populate: {
            path: "color",
          },
        });

      if (isloggedIn === "true") {
        const productsPromises = products.map(async (ele) => {
          const wishlistItem_id = await WishlistModel.findOne({
            user_id,
            product: ele._id,
          });
          const cartItem_id = await CartModel.findOne({
            user_id,
            product: ele._id,
          });

          return {
            ...ele._doc,
            wishlistItem_id: wishlistItem_id ? wishlistItem_id._id : null,
            cartItem_id: cartItem_id ? cartItem_id._id : null,
          };
        });

        products = await Promise.all(productsPromises);
      }

      res.status(200).json({
        status: "success",
        message: "Fetched all products successfully",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },
};
