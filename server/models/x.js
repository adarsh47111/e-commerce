const mongoose = require("mongoose");

// Orders Model
const ordersSchema = new mongoose.Schema({
  order_number: { type: String, unique: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  total_amount: { type: Number, required: true },
  discount_amount: { type: Number, required: true },
  gross_amount: { type: Number, required: true },
  shipping_amount: { type: Number, required: true },
  net_amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["placed", "processing", "shipping", "delivered"],
    required: true,
  },
  payment_status: { type: String, enum: ["paid", "not paid"], required: true },
  payment_type: {
    type: String,
    enum: ["netbanking", "upi", "cod"],
    required: true,
  },
  payment_transaction_id: { type: String, default: null },
});

const Orders = mongoose.model("Orders", ordersSchema);

// OrderItems Model
const orderItemsSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  product_variant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductVariants",
    required: true,
  },
  product_name: { type: String, required: true },
  color: { type: String, default: null },
  size: { type: String, default: null },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total_amount: { type: Number, required: true },
});

const OrderItems = mongoose.model("OrderItems", orderItemsSchema);

// OrderShippingAddresses Model
const orderShippingAddressesSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
    required: true,
  },
  shipping_address_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShippingAddresses",
    required: true,
  },
  full_address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zip_code: { type: String, required: true },
});

const OrderShippingAddresses = mongoose.model(
  "OrderShippingAddresses",
  orderShippingAddressesSchema
);

// Wishlist Model
const wishlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  product_variant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductVariants",
    default: null,
  },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// OffersDiscounts Model
const offersDiscountsSchema = new mongoose.Schema({
  coupon_code: { type: String, unique: true },
  discount_type: { type: String, enum: ["fixed", "rate"], required: true },
  discount_value: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], required: true },
});

const OffersDiscounts = mongoose.model(
  "OffersDiscounts",
  offersDiscountsSchema
);

module.exports = {
  UserRoles,
  Users,
  Categories,
  Products,
  ProductVariants,
  Carts,
  Orders,
  OrderItems,
  OrderShippingAddresses,
  Wishlist,
  OffersDiscounts,
};

const a = [
  {
    _id: {
      $oid: "66421d0ac61ad73ce20f1a20",
    },
    name: "iPhone 15",
    price: 999,
    description:
      "The latest flagship smartphone from Apple, featuring a stunning OLED display, powerful A16 Bionic chip, and advanced camera system.",
    brand: {
      $oid: "66421d0ac61ad73ce20f1a1e",
    },
    category: {
      $oid: "664241bce8679fd7daeae373",
    },
    status: "active",
    __v: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM0fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1609692814867-d668c4487979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1603816245457-fe9c80b740ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    _id: {
      $oid: "66421d5f26ded3c5ca3e6937",
    },
    name: "Samsung Galaxy S23",
    price: 1099,
    description:
      "The next-generation flagship device from Samsung, offering cutting-edge features such as a high-refresh-rate AMOLED display, Snapdragon 8 Gen 3 processor, and versatile camera setup.",
    brand: {
      $oid: "66421d5f26ded3c5ca3e6935",
    },
    category: {
      $oid: "664241bce8679fd7daeae373",
    },
    status: "active",
    __v: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM0fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1609692814867-d668c4487979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1603816245457-fe9c80b740ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    _id: {
      $oid: "66421d7b26ded3c5ca3e693c",
    },
    name: "Samsung Galaxy S20",
    price: 699,
    description:
      "A premium smartphone from Samsung, known for its sleek design, vibrant display, and impressive camera capabilities.",
    brand: {
      $oid: "66421d5f26ded3c5ca3e6935",
    },
    category: {
      $oid: "664241bce8679fd7daeae373",
    },
    status: "active",
    __v: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM0fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1609692814867-d668c4487979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1603816245457-fe9c80b740ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    _id: {
      $oid: "66421d9226ded3c5ca3e6942",
    },
    name: "Poco M6 5G",
    price: 299,
    description:
      "A budget-friendly 5G smartphone from Poco, featuring a large display, long-lasting battery, and fast performance.",
    brand: {
      $oid: "66421d9226ded3c5ca3e6940",
    },
    category: {
      $oid: "664241bce8679fd7daeae373",
    },
    status: "active",
    __v: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM0fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1609692814867-d668c4487979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1603816245457-fe9c80b740ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    _id: {
      $oid: "66421d9e26ded3c5ca3e6948",
    },
    name: "OnePlus Nord CE",
    price: 399,
    description:
      "The latest addition to the OnePlus Nord series, offering a sleek design, smooth performance, and a versatile camera system at an affordable price.",
    brand: {
      $oid: "66421d9e26ded3c5ca3e6946",
    },
    category: {
      $oid: "664241bce8679fd7daeae373",
    },
    status: "active",
    __v: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM0fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1609692814867-d668c4487979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1603816245457-fe9c80b740ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    _id: {
      $oid: "66421daa26ded3c5ca3e694e",
    },
    name: "Realme 12X",
    price: 249,
    description:
      "A mid-range smartphone from Realme, featuring a high-resolution display, fast-charging support, and a quad-camera setup for capturing stunning photos.",
    brand: {
      $oid: "66421daa26ded3c5ca3e694c",
    },
    category: {
      $oid: "664241bce8679fd7daeae373",
    },
    status: "active",
    __v: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM0fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1609692814867-d668c4487979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1603816245457-fe9c80b740ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    _id: {
      $oid: "66421db626ded3c5ca3e6954",
    },
    name: "Vivo T3X 5G",
    price: 449,
    description:
      "A 5G-enabled smartphone from Vivo, offering a stylish design, powerful performance, and enhanced connectivity for seamless multitasking and gaming.",
    brand: {
      $oid: "66421db626ded3c5ca3e6952",
    },
    category: {
      $oid: "664241bce8679fd7daeae373",
    },
    status: "active",
    __v: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM0fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1609692814867-d668c4487979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1603816245457-fe9c80b740ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    _id: {
      $oid: "66421dc226ded3c5ca3e695a",
    },
    name: "Oppo Reno 8",
    price: 549,
    description:
      "A high-end smartphone from Oppo, featuring a sleek design, powerful camera system, and fast-charging capabilities for an enhanced user experience.",
    brand: {
      $oid: "66421dc226ded3c5ca3e6958",
    },
    category: {
      $oid: "664241bce8679fd7daeae373",
    },
    status: "active",
    __v: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM0fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1609692814867-d668c4487979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1603816245457-fe9c80b740ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    _id: {
      $oid: "66421dce26ded3c5ca3e6960",
    },
    name: "Sony Xperia 1 III",
    price: 1199,
    description:
      "A flagship smartphone from Sony, offering a stunning 4K OLED display, advanced camera system with Zeiss optics, and powerful Snapdragon 888 processor.",
    brand: {
      $oid: "66421dce26ded3c5ca3e695e",
    },
    category: {
      $oid: "664241bce8679fd7daeae373",
    },
    status: "active",
    __v: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM0fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1609692814867-d668c4487979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1603816245457-fe9c80b740ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    _id: {
      $oid: "66421dda26ded3c5ca3e6966",
    },
    name: "Google Pixel 7",
    price: 899,
    description:
      "The latest Google flagship phone, offering a pure Android experience, excellent camera quality, and seamless integration with Google services.",
    brand: {
      $oid: "66421dda26ded3c5ca3e6964",
    },
    category: {
      $oid: "664241bce8679fd7daeae373",
    },
    status: "active",
    __v: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1608474498735-cabbe7461503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM0fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1609692814867-d668c4487979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1603816245457-fe9c80b740ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHxpcGhvbmV8ZW58MHx8MHx8fDA%3D",
    ],
  },
];