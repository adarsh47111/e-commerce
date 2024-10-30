import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import productReducer from "./slices/product";
import wishlistReducer from "./slices/wishlist";
import cartReducer from "./slices/cart";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export default store;
