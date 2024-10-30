import { SERVER_BASE_URL } from "./constant";

export const register_api = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const body = { firstName, lastName, email, password };

  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    data = await response.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const login_api = async ({ email, password }) => {
  const body = { email, password };
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const getAllCategories_api = async () => {
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/category`);
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const getCategories_api = async (categoryList) => {
  let res, data;
  const body = { categoryList };
  try {
    res = await fetch(`${SERVER_BASE_URL}/category/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const createProduct_api = async (body) => {
  console.log("b", body);
  let res, data;

  try {
    res = await fetch(`${SERVER_BASE_URL}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const getProduct_api = async (user_id, isloggedIn, product_id) => {
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/product/${product_id}`, {
      headers: {
        x_isloggedIn: isloggedIn,
        x_user_id: user_id,
      },
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const getAllProducts_api = async (user_id, isloggedIn) => {
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/product`, {
      headers: {
        x_isloggedIn: isloggedIn,
        x_user_id: user_id,
      },
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const getProducts_category_api = async (
  user_id,
  isloggedIn,
  category_id
) => {
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/product/category/${category_id}`, {
      headers: {
        x_isloggedIn: isloggedIn,
        x_user_id: user_id,
      },
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const getBrands_api = async (category_id) => {
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/brand/category/${category_id}`);
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const getAllBrands_api = async () => {
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/brand`);
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const getColors_api = async (category_id) => {
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/color/category/${category_id}`);
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const getAllColors_api = async () => {
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/color`);
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

//----------------------------------------------------------------

export const addToWishlist_api = async (token, product_id) => {
  let res, data;
  const body = { product_id };

  try {
    res = await fetch(`${SERVER_BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const addItemsToWishList_api = async (token, itemArray) => {
  let res, data;
  const body = { product_ids: itemArray };
  try {
    res = await fetch(`${SERVER_BASE_URL}/wishlist/items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const removeFromWishlist_api = async (token, wishlistItem_id) => {
  let res, data;
  // const body = { wishlistItem_id };
  try {
    res = await fetch(`${SERVER_BASE_URL}/wishlist/item/${wishlistItem_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      },
      // body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const getWishlistItem_api = async (token) => {
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

//--------------------------------------------------------------
export const getCartItems_api = async (token) => {
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const addToCart_api = async ({
  token,
  product_id,
  color,
  quantity = 1,
}) => {
  let res, data;
  const body = {
    token,
    product_id,
    color,
    quantity,
  };

  try {
    res = await fetch(`${SERVER_BASE_URL}/cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  console.log(data);

  return data;
};

export const removeFromCart_api = async (token, cartItem_id) => {
  let res, data;
  try {
    res = await fetch(`${SERVER_BASE_URL}/cart/item/${cartItem_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const removeItemsFromCart_api = async (token, itemArray) => {
  let res, data;
  const body = { cartItem_ids: itemArray };
  try {
    res = await fetch(`${SERVER_BASE_URL}/cart/items`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};

export const updateCartItemQuantity_api = async (
  token,
  cartItem_id,
  quantity
) => {
  console.log(token, cartItem_id, quantity);
  let res, data;
  const body = { cartItem_id, quantity };
  try {
    res = await fetch(`${SERVER_BASE_URL}/cart/${cartItem_id}/quantity`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    data = await res.json();
  } catch (error) {
    console.error(error);
  }

  return data;
};
