import { Check, Minus, Plus, TicketPercent, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Seprator from "../components/Seprator";
import { useDispatch, useSelector } from "react-redux";
import UnAuthorized from "../components/UnAuthorized";
import {
  addItemsToWishList_api,
  getCartItems_api,
  removeFromCart_api,
  removeItemsFromCart_api,
  updateCartItemQuantity_api,
} from "../api";
import { toast } from "react-toastify";
import EmptyCart from "../components/EmptyCart";
import { useNavigate } from "react-router-dom";
import { removeFromCart_Action, setCart_Action } from "../redux/slices/cart";

const Cart = () => {
  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { product_list } = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const { status, message, data } = await getCartItems_api(
          token,
          user._id
        );
        if (status === "success") {
          {
            dispatch(
              setCart_Action({
                products: data,
              })
            );
          }
          setIsCartEmpty(data.length === 0);
          setSelectedItems(data.map((item) => item._id));

          // setCart((prevCart) => {
          //   const newCart = data;
          //   setIsCartEmpty(newCart.length === 0);
          //   return newCart;
          // });
        } else if (status === "error") toast.error("Error in fetching cart");
      })();
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else {
      if (product_list.length === 0) setIsCartEmpty(true);
    }
  }, [product_list]);

  const handleSelectAll = () => {
    setSelectedItems(product_list.map((item) => item._id));
  };

  const handleUnSelectAll = () => {
    setSelectedItems([]);
  };

  const handleRemoveSelectedItems = async () => {
    const { status, message, data } = await removeItemsFromCart_api(
      token,
      selectedItems
    );

    if (status === "success") {
      dispatch(removeFromCart_Action({ cartItem_ids: selectedItems }));
      setSelectedItems([]);
    } else if (status === "error") toast.error("Error: Items not removed");
  };

  const handleMoveToWishlist = async () => {
    const result1 = await removeItemsFromCart_api(token, selectedItems);
    if (result1 === "error") {
      toast.error("Error: Items not moved to wishlist");
      return;
    }

    const result2 = await addItemsToWishList_api(
      token,
      product_list
        .filter((item) => selectedItems.includes(item._id))
        .map((item) => item.product._id)
    );
    if (result2.status === "success") {
      dispatch(removeFromCart_Action({ cartItem_ids: selectedItems }));
      setSelectedItems([]);
    } else if (result2.status === "error")
      toast.error("Error: Items not moved to wishlist");
  };

  if (!isLoggedIn) return <UnAuthorized />;
  if (isCartEmpty) return <EmptyCart />;

  return (
    <div className="flex flex-col sm:flex-row px-4 sm:px-80 py-4 sm:gap-4">
      <div className="sm:w-3/4 ">
        <div className="flex justify-between items-center py-2 my-4">
          <div className="flex items-center space-x-3">
            {selectedItems.length > 0 ? (
              <div
                className="h-5 w-5 bg-red-600 rounded cursor-pointer"
                onClick={handleUnSelectAll}
              >
                <Check size={20} strokeWidth={1.5} color="#ffffff" />
              </div>
            ) : (
              <div
                className="h-5 w-5 border rounded cursor-pointer"
                onClick={handleSelectAll}
              ></div>
            )}
            <p>
              {selectedItems.length}/{product_list.length} ITEMS SELECTED
            </p>
          </div>
          <div className=" flex items-center justify-evenly">
            <Button
              variant={"ghost"}
              className="sm:text-xs"
              onClick={handleRemoveSelectedItems}
            >
              REMOVE
            </Button>
            <div className={"h-7 mx-2 bg-neutral-200 w-[1px]"}></div>
            <Button
              variant={"ghost"}
              className="sm:text-xs"
              onClick={handleMoveToWishlist}
            >
              MOVE TO WISHLIST
            </Button>
          </div>
        </div>
        {product_list?.map(({ _id, product, quantity }) => (
          <CartCard
            key={_id}
            {...{
              cartItem_id: _id,
              product_id: product._id,
              ...product,
              quantity,
              selectedItems,
              setSelectedItems,
            }}
          />
        ))}
      </div>
      <Summary
        {...{
          cart: product_list.filter((item) => selectedItems.includes(item._id)),
        }}
      />
    </div>
  );
};

export default Cart;

const CartCard = ({
  cartItem_id,
  product_id,
  thumbnail,
  name,
  description,
  price,
  quantity,
  rating,
  selectedItems,
  setSelectedItems,
}) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (window.outerWidth < 640) {
    name = name.slice(0, 20) + "...";
    description = description.slice(0, 70) + "...";
  }

  const selected = selectedItems.some((id) => id === cartItem_id);

  const handleUpdateQuantity = async (newQty) => {
    const { status, message, data } = await updateCartItemQuantity_api(
      token,
      cartItem_id,
      newQty
    );

    if (status === "success") setItemQuantity(data.quantity);
  };

  const handleRemoveCartItem = async () => {
    const { status, message, data } = await removeFromCart_api(
      token,
      cartItem_id
    );
    if (status === "success") {
      dispatch(removeFromCart_Action({ cartItem_ids: [cartItem_id] }));
      // setCart((cart) => cart.filter((item) => item._id !== cartItem_id));
      toast.success("Item removed from cart");
    }
    if (status === "error") toast.error("Error: Item not removed");
  };

  const handleSelect = () => {
    setSelectedItems([...selectedItems, cartItem_id]);
  };
  const handleUnSelect = () => {
    setSelectedItems(selectedItems.filter((id) => id !== cartItem_id));
  };

  return (
    <div className="border group relative flex space-x-4 p-2 mb-4 h-54 rounded">
      <div className="relative p-1 bg-neutral-100l rounded flex items-center">
        {selected ? (
          <div
            className="h-5 w-5 absolute top-2 left-2 bg-red-600 rounded cursor-pointer"
            onClick={handleUnSelect}
          >
            <Check size={20} strokeWidth={1.5} color="#ffffff" />
          </div>
        ) : (
          <div
            className="invisible group-hover:visible transition-all h-5 w-5 absolute top-2 left-2 border rounded cursor-pointer"
            onClick={handleSelect}
          ></div>
        )}
        <img
          className="max-h-16 max-w-16 sm:max-w-40 sm:max-h-36 aspect-square rounded cursor-pointer"
          src={thumbnail}
          alt=""
          onClick={() => navigate(`/product/${product_id}`)}
        />
      </div>
      <div className="flex flex-col justify-between space-y-2">
        <div className="w-[80%]">
          <p>{name}</p>
          <p className="text-sm text-neutral-500 ">{description}</p>
        </div>

        <div className="flex justify-between">
          <span className="text-xl font-medium">${price}</span>
          <div className="flex items-center space-x-2">
            <div
              className="bg-neutral-100 hover:bg-neutral-200 transition p-1 rounded-full cursor-pointer"
              onClick={() => handleUpdateQuantity(itemQuantity - 1)}
            >
              <Minus size={16} strokeWidth={1.5} />
            </div>
            <span>{itemQuantity}</span>
            <div
              className="bg-neutral-100 hover:bg-neutral-200 transition p-1 rounded-full cursor-pointer"
              onClick={() => handleUpdateQuantity(itemQuantity + 1)}
            >
              <Plus size={16} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-neutral-100 hover:bg-neutral-200 transition p-1 absolute right-2 rounded-full cursor-pointer"
        onClick={handleRemoveCartItem}
      >
        <Trash2
          className="cursor-pointer"
          size={18}
          strokeWidth={1.5}
          color="#000000"
        />
      </div>
    </div>
  );
};

const Summary = ({ cart }) => {
  const amount = (() => {
    let total = 0;
    cart?.forEach(({ product, quantity }) => {
      total += product.price * quantity;
    });
    return total;
  })();

  return (
    <div className="border rounded-lg sm:w-2/5 p-5 h-fit sm:sticky sm:top-5">
      <p className=" text-sm font-medium">Order Summary</p>
      <div className="my-4 text-neutral-500 text-sm space-y-1">
        {cart?.map(({ product }) => (
          <div key={product._id} className="flex justify-between">
            <span>{product.name}</span>
            <span>${product.price}</span>
          </div>
        ))}
      </div>

      <Seprator />

      <div className="my-4 text-neutral-500 text-sm space-y-1">
        <div className="flex justify-between">
          <span>Amount</span>
          <span>${amount}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between pt-8">
          <span className="text-xl font-semibold">Total</span>
          <span className="text-xl font-semibold">${amount}</span>
        </div>
      </div>

      <Seprator className="h-[0.2px]" />

      <div className="flex items-center space-x-4 border rounded h-10 p-2 my-2">
        <TicketPercent size={20} strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Apply coupon code here"
          className="outline-none w-full text-sm"
        />
      </div>
      <Button className="w-full">Checkout</Button>
    </div>
  );
};
