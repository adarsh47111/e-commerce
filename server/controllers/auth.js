import { CategoryModel, UserModel } from "../models/index.js";
import { CustomErrorHandler, JwtService } from "../services/index.js";
import { z } from "zod";

export const register = async (req, res, next) => {
  //------------------------validation--------------------------------
  const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({ message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) return next(result.error);

  const { firstName, lastName, email, password } = req.body;

  try {
    const userAlreadyExists = await UserModel.findOne({ email });

    if (userAlreadyExists) return next(CustomErrorHandler.userAlreadyExist());

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    const access_token = JwtService.sign({ _id: newUser._id });
    res.status(201).json({
      status: "success",
      message: "Registered successfully",
      data: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const schema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Must be 6 or more characters long" }),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) return next(result.error);

  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return next(CustomErrorHandler.wrongCredentials());

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) return next(CustomErrorHandler.wrongCredentials());

    const access_token = JwtService.sign({ _id: user._id });
    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// const data = {
//   Electronics: {
//     "Mobiles & Accessories": [
//       "Smartphones",
//       "Feature Phones",
//       "Mobile Cases & Covers",
//       "Screen Protectors",
//       "Power Banks",
//       "Mobile Accessories",
//       "Wearable Devices",
//     ],
//     "Computers & Accessories": [
//       "Laptops",
//       "Desktops",
//       "Monitors",
//       "Printers & Ink",
//       "Computer Components",
//       "Networking Devices",
//       "Laptop Accessories",
//     ],
//     "Audio & Video": [
//       "Headphones",
//       "Speakers",
//       "Home Theater Systems",
//       "Earphones",
//       "MP3 & MP4 Players",
//       "Audio & Video Accessories",
//     ],
//     "Cameras & Photography": [
//       "DSLR Cameras",
//       "Point & Shoot Cameras",
//       "Camera Lenses",
//       "Camera Accessories",
//       "Action Cameras",
//       "Surveillance Cameras",
//     ],
//     Gaming: [
//       "Gaming Consoles",
//       "Video Games",
//       "Gaming Accessories",
//       "Gaming Laptops & PCs",
//       "Gaming Monitors",
//       "Gaming Keyboards & Mice",
//     ],
//   },
//   "Clothing & Accessories": {
//     "Men's Clothing": [
//       "T-Shirts",
//       "Shirts",
//       "Jeans",
//       "Trousers & Chinos",
//       "Shorts",
//       "Innerwear & Sleepwear",
//       "Suits & Blazers",
//     ],
//     "Women's Clothing": [
//       "Tops & Tees",
//       "Dresses",
//       "Skirts",
//       "Jeans & Jeggings",
//       "Leggings & Tights",
//       "Lingerie & Nightwear",
//       "Sarees & Ethnic Wear",
//     ],
//     "Kids' Clothing": [
//       "Boys' Clothing",
//       "Girls' Clothing",
//       "Baby Clothing",
//       "Kids' Shoes",
//       "School Uniforms",
//       "Kids' Accessories",
//     ],
//   },
//   "Home & Kitchen": {
//     "Kitchen & Dining": [
//       "Cookware",
//       "Dinnerware & Serveware",
//       "Kitchen Appliances",
//       "Kitchen Tools & Gadgets",
//       "Bakeware",
//       "Storage & Organization",
//     ],
//     Furniture: [
//       "Living Room Furniture",
//       "Bedroom Furniture",
//       "Dining Room Furniture",
//       "Office Furniture",
//       "Outdoor Furniture",
//       "Kids' Furniture",
//     ],
//     "Home Decor": [
//       "Wall Art & Decor",
//       "Lighting",
//       "Clocks",
//       "Mirrors",
//       "Candles & Holders",
//       "Indoor Plants & Planters",
//     ],
//   },
//   "Books, Movies & Music": {
//     Books: [
//       "Fiction",
//       "Non-Fiction",
//       "Literature & Fiction",
//       "Textbooks & Study Guides",
//       "Children's Books",
//       "Comics & Graphic Novels",
//     ],
//     "Movies & TV Shows": [
//       "Action & Adventure",
//       "Drama",
//       "Comedy",
//       "Horror",
//       "Science Fiction & Fantasy",
//       "Documentary",
//     ],
//     Music: [
//       "CDs & Vinyl",
//       "MP3 Downloads",
//       "Music Instruments",
//       "Music Accessories",
//     ],
//   },
//   "Health & Personal Care": {
//     "Health Care": [
//       "Medicines & Treatments",
//       "Health Monitors & Kits",
//       "Vitamins & Supplements",
//       "First Aid",
//       "Medical Equipment",
//     ],
//     "Personal Care": [
//       "Skin Care",
//       "Hair Care",
//       "Bath & Body",
//       "Fragrances",
//       "Oral Care",
//       "Men's Grooming",
//       "Women's Hygiene",
//     ],
//   },
//   "Sports & Outdoors": {
//     Sports: [
//       "Fitness Equipment",
//       "Exercise Bikes",
//       "Yoga & Pilates",
//       "Sports Clothing",
//       "Sports Shoes",
//       "Team Sports",
//     ],
//     "Outdoor Recreation": [
//       "Camping & Hiking",
//       "Cycling",
//       "Fishing",
//       "Boating & Water Sports",
//       "Outdoor Clothing & Accessories",
//       "Hunting & Shooting",
//     ],
//   },
//   "Automotive & Industrial": {
//     Automotive: [
//       "Car Accessories",
//       "Car Electronics",
//       "Car Parts",
//       "Motorcycle Accessories",
//       "Oils & Fluids",
//       "Tools & Equipment",
//     ],
//     "Industrial & Scientific": [
//       "Lab & Scientific Products",
//       "Janitorial & Sanitation Supplies",
//       "Occupational Health & Safety Products",
//       "Industrial Electrical Equipment",
//       "Industrial Hardware",
//       "Raw Materials",
//     ],
//   },
// };

// export async function addCategoriesAndSubcategories(req, res) {
//   for (const category in data) {
//     const categoryDoc = new CategoryModel({ name: category, status: "active" });
//     await categoryDoc.save();

//     for (const subcategory in data[category]) {
//       const subcategoryDoc = new CategoryModel({
//         name: subcategory,
//         parent_category: categoryDoc._id,
//         status: "active",
//       });
//       await subcategoryDoc.save();

//       categoryDoc.child_categories.push(subcategoryDoc._id);

//       for (const subsubcategory of data[category][subcategory]) {
//         const subsubcategoryDoc = new CategoryModel({
//           name: subsubcategory,
//           parent_category: subcategoryDoc._id,
//           status: "active",
//         });
//         await subsubcategoryDoc.save();

//         subcategoryDoc.child_categories.push(subsubcategoryDoc._id);
//       }

//       await subcategoryDoc.save();
//     }

//     await categoryDoc.save();
//   }

//   res.json("yo");
// }
