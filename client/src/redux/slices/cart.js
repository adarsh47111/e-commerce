import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product_list: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart_Action(state, action) {
      const { products } = action.payload;
      state.product_list = products;
    },

    resetCartAction(state, action) {
      state.product_list = [];
    },

    removeFromCart_Action(state, action) {
      const { cartItem_ids } = action.payload;
      state.product_list = state.product_list.filter(
        (ele) => !cartItem_ids.includes(ele._id)
      );
    },
  },
});

export const { setCart_Action, resetCartAction, removeFromCart_Action } =
  slice.actions;

export default slice.reducer;
