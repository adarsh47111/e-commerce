import authRoute from "./auth.js";
import productRoute from "./product.js";
import categoryRoute from "./category.js";
import brandRoute from "./brand.js";
import colorRoute from "./color.js";
import wishlistRoute from "./wishlist.js";
import cartRoute from "./cart.js";

import express from "express";
import { authenticate } from "../middlewares/index.js";
import { ProductModel } from "../models/product.js";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/product", productRoute);
router.use("/category", categoryRoute);
router.use("/brand", brandRoute);
router.use("/color", colorRoute);
router.use("/wishlist", authenticate, wishlistRoute);
router.use("/cart", authenticate, cartRoute);

export default router;

// const arr = [
//   { name: "Red", code: "#FF0000" },
//   { name: "Green", code: "#00FF00" },
//   { name: "Blue", code: "#0000FF" },
//   { name: "Yellow", code: "#FFFF00" },
//   { name: "Cyan", code: "#00FFFF" },
//   { name: "Magenta", code: "#FF00FF" },
//   { name: "Black", code: "#000000" },
//   { name: "White", code: "#FFFFFF" },
//   { name: "Gray", code: "#808080" },
//   { name: "Orange", code: "#FFA500" },
//   { name: "Pink", code: "#FFC0CB" },
//   { name: "Purple", code: "#800080" },
//   { name: "Brown", code: "#A52A2A" },
//   { name: "Lime", code: "#00FF00" },
//   { name: "Maroon", code: "#800000" },
//   { name: "Navy", code: "#000080" },
//   { name: "Olive", code: "#808000" },
//   { name: "Teal", code: "#008080" },
//   { name: "Silver", code: "#C0C0C0" },
//   { name: "Gold", code: "#FFD700" },
//   { name: "Indigo", code: "#4B0082" },
//   { name: "Violet", code: "#EE82EE" },
//   { name: "Turquoise", code: "#40E0D0" },
//   { name: "Lavender", code: "#E6E6FA" },
//   { name: "Beige", code: "#F5F5DC" },
//   { name: "Mint", code: "#98FF98" },
//   { name: "Coral", code: "#FF7F50" },
//   { name: "Salmon", code: "#FA8072" },
//   { name: "Chocolate", code: "#D2691E" },
//   { name: "Crimson", code: "#DC143C" },
//   { name: "Khaki", code: "#F0E68C" },
//   { name: "Ivory", code: "#FFFFF0" },
//   { name: "Orchid", code: "#DA70D6" },
//   { name: "Plum", code: "#DDA0DD" },
//   { name: "RoyalBlue", code: "#4169E1" },
//   { name: "SkyBlue", code: "#87CEEB" },
//   { name: "Tomato", code: "#FF6347" },
//   { name: "Chartreuse", code: "#7FFF00" },
//   { name: "Aquamarine", code: "#7FFFD4" },
//   { name: "Peru", code: "#CD853F" },
//   { name: "SlateBlue", code: "#6A5ACD" },
//   { name: "SlateGray", code: "#708090" },
//   { name: "Sienna", code: "#A0522D" },
//   { name: "RosyBrown", code: "#BC8F8F" },
//   { name: "SeaGreen", code: "#2E8B57" },
//   { name: "SpringGreen", code: "#00FF7F" },
//   { name: "SteelBlue", code: "#4682B4" },
//   { name: "Tan", code: "#D2B48C" },
//   { name: "Thistle", code: "#D8BFD8" },
//   { name: "Wheat", code: "#F5DEB3" },
//   { name: "Seashell", code: "#FFF5EE" },
//   { name: "Snow", code: "#FFFAFA" },
//   { name: "PapayaWhip", code: "#FFEFD5" },
//   { name: "PeachPuff", code: "#FFDAB9" },
//   { name: "Moccasin", code: "#FFE4B5" },

//   { name: "MistyRose", code: "#FFE4E1" },
//   { name: "Gainsboro", code: "#DCDCDC" },
//   { name: "LightCoral", code: "#F08080" },
//   { name: "HotPink", code: "#FF69B4" },
//   { name: "DeepPink", code: "#FF1493" },
//   { name: "LightPink", code: "#FFB6C1" },
//   { name: "PaleVioletRed", code: "#DB7093" },
//   { name: "MediumVioletRed", code: "#C71585" },
//   { name: "DarkRed", code: "#8B0000" },
//   { name: "FireBrick", code: "#B22222" },
//   { name: "IndianRed", code: "#CD5C5C" },
//   { name: "LightSalmon", code: "#FFA07A" },
//   { name: "DarkSalmon", code: "#E9967A" },
//   { name: "LightCoral", code: "#F08080" },
//   { name: "DarkGoldenRod", code: "#B8860B" },
//   { name: "DarkKhaki", code: "#BDB76B" },
//   { name: "Gold", code: "#FFD700" },
//   { name: "PaleGoldenRod", code: "#EEE8AA" },
//   { name: "DarkOliveGreen", code: "#556B2F" },
//   { name: "OliveDrab", code: "#6B8E23" },
//   { name: "LawnGreen", code: "#7CFC00" },
//   { name: "GreenYellow", code: "#ADFF2F" },
//   { name: "YellowGreen", code: "#9ACD32" },
//   { name: "ForestGreen", code: "#228B22" },
//   { name: "DarkGreen", code: "#006400" },
//   { name: "MediumSeaGreen", code: "#3CB371" },
//   { name: "MediumAquamarine", code: "#66CDAA" },
//   { name: "DarkSeaGreen", code: "#8FBC8F" },
//   { name: "MediumTurquoise", code: "#48D1CC" },
//   { name: "DarkTurquoise", code: "#00CED1" },
//   { name: "CadetBlue", code: "#5F9EA0" },
//   { name: "PowderBlue", code: "#B0E0E6" },
//   { name: "LightBlue", code: "#ADD8E6" },
//   { name: "LightSkyBlue", code: "#87CEFA" },
//   { name: "DodgerBlue", code: "#1E90FF" },
//   { name: "CornflowerBlue", code: "#6495ED" },
//   { name: "MediumSlateBlue", code: "#7B68EE" },
//   { name: "MediumBlue", code: "#0000CD" },
//   { name: "DarkBlue", code: "#00008B" },
//   { name: "MidnightBlue", code: "#191970" },
//   { name: "Cornsilk", code: "#FFF8DC" },
//   { name: "BlanchedAlmond", code: "#FFEBCD" },
//   { name: "Bisque", code: "#FFE4C4" },
//   { name: "NavajoWhite", code: "#FFDEAD" },
//   { name: "AntiqueWhite", code: "#FAEBD7" },
//   { name: "Linen", code: "#FAF0E6" },
//   { name: "OldLace", code: "#FDF5E6" },
//   { name: "FloralWhite", code: "#FFFAF0" },
//   { name: "HoneyDew", code: "#F0FFF0" },
//   { name: "MintCream", code: "#F5FFFA" },
//   { name: "Azure", code: "#F0FFFF" },
//   { name: "AliceBlue", code: "#F0F8FF" },
//   { name: "GhostWhite", code: "#F8F8FF" },
//   { name: "LavenderBlush", code: "#FFF0F5" },
//   { name: "Seashell", code: "#FFF5EE" },
//   { name: "Snow", code: "#FFFAFA" },
//   { name: "PapayaWhip", code: "#FFEFD5" },
//   { name: "PeachPuff", code: "#FFDAB9" },
//   { name: "Moccasin", code: "#FFE4B5" },
//   { name: "LemonChiffon", code: "#FFFACD" },
//   { name: "PaleGreen", code: "#98FB98" },
//   { name: "LightGreen", code: "#90EE90" },
//   { name: "MediumSpringGreen", code: "#00FA9A" },
//   { name: "SpringGreen", code: "#00FF7F" },
//   { name: "LightSeaGreen", code: "#20B2AA" },
//   { name: "MediumSeaGreen", code: "#3CB371" },
//   { name: "DarkSeaGreen", code: "#8FBC8F" },
//   { name: "MediumAquamarine", code: "#66CDAA" },
//   { name: "DarkSlateGray", code: "#2F4F4F" },
//   { name: "LightCyan", code: "#E0FFFF" },
//   { name: "PaleTurquoise", code: "#AFEEEE" },
//   { name: "Aqua", code: "#00FFFF" },
//   { name: "DarkCyan", code: "#008B8B" },
//   { name: "LightSteelBlue", code: "#B0C4DE" },
//   { name: "CadetBlue", code: "#5F9EA0" },
//   { name: "DarkSlateBlue", code: "#483D8B" },
//   { name: "MediumSlateBlue", code: "#7B68EE" },
//   { name: "SlateBlue", code: "#6A5ACD" },
//   { name: "LightSlateGray", code: "#778899" },
//   { name: "DimGray", code: "#696969" },
//   { name: "DarkGray", code: "#A9A9A9" },
//   { name: "LightGray", code: "#D3D3D3" },
//   { name: "WhiteSmoke", code: "#F5F5F5" },
//   { name: "Lavender", code: "#E6E6FA" },
//   { name: "LightGoldenRodYellow", code: "#FAFAD2" },
//   { name: "HoneyDew", code: "#F0FFF0" },
//   { name: "Ivory", code: "#FFFFF0" },
//   { name: "Beige", code: "#F5F5DC" },
//   { name: "Cornsilk", code: "#FFF8DC" },
//   { name: "OldLace", code: "#FDF5E6" },
//   { name: "FloralWhite", code: "#FFFAF0" },
//   { name: "MintCream", code: "#F5FFFA" },
//   { name: "AliceBlue", code: "#F0F8FF" },
//   { name: "GhostWhite", code: "#F8F8FF" },
//   { name: "White", code: "#FFFFFF" },
//   { name: "Black", code: "#000000" },
//   { name: "DimGray", code: "#696969" },
//   { name: "SlateGray", code: "#708090" },
//   { name: "DarkSlateGray", code: "#2F4F4F" },
//   { name: "LightSlateGray", code: "#778899" },
//   { name: "Gray", code: "#808080" },
//   { name: "Silver", code: "#C0C0C0" },
// ];

// const temp = [
//   {
//     color: "664c8fd3ad10f31eda60401d",
//     price: "1",
//     quantity: "10",
//   },
//   {
//     color: "664c8fd3ad10f31eda60402c",
//     price: "2",
//     quantity: "20",
//   },
// ];

// const fun = async () => {
//   const p = await ProductModel.find();
//   p.forEach(async (ele) => {
//     await ProductModel.findOneAndUpdate({ _id: ele._id }, { colors: temp });
//   });
// };

// router.get("/xx", fun);
