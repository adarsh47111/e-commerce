import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product_list: [],
};

const slice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist_Action(state, action) {
      const { products } = action.payload;
      state.product_list = products;
    },

    resetWishlist_Action(state, action) {
      state.product_list = [];
    },

    removeFromWishlist_Action(state, action) {
      const { wishlistItem_id } = action.payload;
      state.product_list = state.product_list.filter(
        (ele) => ele._id !== wishlistItem_id
      );
    },

    updateCartStateInWishList_Action(state, action) {
      const { product_id, cartItem_id } = action.payload;

      console.log(product_id, cartItem_id);

      state.product_list = state.product_list.map((ele) => {
        if (ele.product._id !== product_id) return ele;

        ele.product.cartItem_id = cartItem_id;
        return ele;
      });
    },
  },
});

export const {
  setWishlist_Action,
  resetWishlist_Action,
  removeFromWishlist_Action,
  updateCartStateInWishList_Action,
} = slice.actions;
export default slice.reducer;
