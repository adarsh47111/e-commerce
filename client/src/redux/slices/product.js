import { createSlice } from "@reduxjs/toolkit";

// this slice will store all products that are fetched through api in current page
const initialState = {
  product_list: [],
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts_Action(state, action) {
      const { products } = action.payload;
      state.product_list = products;
    },

    resetProduct_list_Action(state, action) {
      state.product_list = [];
    },

    updateWishlistState_Action(state, action) {
      const { product_id, wishlistItem_id } = action.payload;
      state.product_list = state.product_list.map((ele) => {
        if (ele._id !== product_id) return ele;

        ele.wishlistItem_id = wishlistItem_id;
        return ele;
      });
    },

    updateCartState_Action(state, action) {
      const { product_id, cartItem_id } = action.payload;
      state.product_list = state.product_list.map((ele) => {
        if (ele._id !== product_id) return ele;

        ele.cartItem_id = cartItem_id;
        return ele;
      });
    },
  },
});

export const {
  setProducts_Action,
  resetProduct_list_Action,
  updateWishlistState_Action,
  updateCartState_Action,
} = slice.actions;
export default slice.reducer;
