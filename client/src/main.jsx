import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import WishList from "./pages/WishList.jsx";
import Cart from "./pages/Cart.jsx";
import Account from "./pages/Account.jsx";
import Product from "./pages/Product.jsx";
import Profile from "./components/Profile.jsx";
import AddressBook from "./components/AddressBook.jsx";
import Orders from "./components/Orders.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer, Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Seller from "./pages/Seller.jsx";
import Product_List from "./pages/Product_List.jsx";
import Product_admin from "./pages/Admin/Product_admin.jsx";
import AdminLayout from "./pages/Admin/AdminLayout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="" element={<Home />} />
      <Route path="wishlist" element={<WishList />} />
      <Route path="cart" element={<Cart />} />
      <Route path="account" element={<Account />}>
        <Route path="profile" element={<Profile />} />
        <Route path="address" element={<AddressBook />} />
        {/* <Route path="payment" element={<Payment />} /> */}
        <Route path="orders" element={<Orders />} />
      </Route>
      <Route path="product/:product_id" element={<Product />} />
      <Route path="product_list/:category_id" element={<Product_List />} />
      <Route path="seller" element={<Seller />} />
      {/* <Route path="*" element={<NotFound />} /> */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="product" element={<Product_admin />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  </Provider>
  // </React.StrictMode>
);
