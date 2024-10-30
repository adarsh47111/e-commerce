import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLoggedIn: false,
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { _id, email, firstName, lastName, token } = action.payload;
      state.user = { _id, firstName, lastName, email };
      state.token = token;
      state.isLoggedIn = true;
    },

    logout(state, action) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = slice.actions;
export default slice.reducer;
