import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import BreadCrumbs from "../components/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import UnAuthorized from "../components/UnAuthorized";
import {
  addToCart_api,
  getWishlistItem_api,
  removeFromCart_api,
  removeFromWishlist_api,
} from "../api";
import EmptyWishlist from "../components/EmptyWishlist";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShoppingCart, Trash2 } from "lucide-react";
import Star from "../components/Star";
import {
  removeFromWishlist_Action,
  setWishlist_Action,
  updateCartStateInWishList_Action,
} from "../redux/slices/wishlist";

const WishList = () => {
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const { product_list } = useSelector((state) => state.wishlist);
  const [isWishlistEmpty, setIsWishlistEmpty] = useState(false);
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status, message, data } = await getWishlistItem_api(token);
      if (status === "success") {
        {
          dispatch(
            setWishlist_Action({
              products: data,
            })
          );
        }
        setIsWishlistEmpty(data.length === 0);
      } else if (status === "error") toast.error("Error in fetching wishlist");
    })();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else {
      if (product_list.length === 0) setIsWishlistEmpty(true);
    }
  }, [product_list]);

  const handleMoveAllToCart = async () => {
    const { status, message, data } = await moveAllToCart_api(token);
    if (status === "success") toast.success(message);
    else toast.error(message);
    dispatch(setWishlist_Action({ products: [] }));
    setIsWishlistEmpty(true);
  };

  if (!isLoggedIn) return <UnAuthorized />;
  if (isWishlistEmpty) return <EmptyWishlist />;

  return (
    <div className="px-4 sm:px-20 py-4">
      <BreadCrumbs />
      <div className="flex justify-between my-8">
        <span className="text-xl">WhisList ({product_list.length})</span>
        <Button variant="outline" onClick={handleMoveAllToCart}>
          Move All To Cart
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-6 grid-flow-row gap-4">
        {product_list?.map(({ _id, product }) => (
          <WishlistItemCard
            key={_id}
            {...{ ...product, wishlistItem_id: _id }}
          />
        ))}
      </div>
    </div>
  );
};

export default WishList;

const WishlistItemCard = ({
  _id,
  name,
  thumbnail,
  price,
  discountPercentage = 20,
  rating = 3.5,
  wishlistItem_id,
  cartItem_id,
}) => {
  const isCarted = useSelector((state) => {
    const item = state.wishlist.product_list.find(
      (ele) => ele._id === wishlistItem_id
    );

    console.log(item);
    if (!("cartItem_id" in item.product)) return false;
    return item.product?.cartItem_id !== null;
  });

  console.log(isCarted);

  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const discountedPrice = (() => {
    if (discountPercentage === 0) return price;
    return Math.ceil((price * (100 - discountPercentage)) / 100);
  })();

  const handleDeleteFromWishList = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to remove item from wishlist");
      return;
    }
    const { status, message, data } = await removeFromWishlist_api(
      token,
      wishlistItem_id
    );
    if (status === "success") {
      dispatch(
        removeFromWishlist_Action({
          wishlistItem_id,
        })
      );
      toast.success("Item removed successfully");
    } else if (status === "error") toast.error("Error: Item not removed");
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add item to cart");
      return;
    }
    const { status, message, data } = await addToCart_api(token, _id);
    if (status === "success") {
      dispatch(
        updateCartStateInWishList_Action({
          product_id: _id,
          cartItem_id: data._id,
        })
      );
      toast.success("Item added successfully");
    } else if (status === "error") toast.error("Error: Item not added");
  };

  const handleDeleteFromCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to remove item from cart");
      return;
    }
    const { status, message, data } = await removeFromCart_api(
      token,
      cartItem_id
    );
    if (status === "success") {
      dispatch(
        updateCartStateInWishList_Action({
          product_id: _id,
          cartItem_id: null,
        })
      );
      toast.success("Item removed successfully");
    } else if (status === "error") toast.error("Error: Item not removed");
  };

  return (
    <div className="sm:w-48 sm:h-68 space-y-2">
      <div className="relative group flex justify-center items-center h-40 w-40 sm:h-44 sm:w-48 my-2 bg-slate-100 rounded-lg overflow-hidden">
        <img
          className="h-[100%] w-[100%] cursor-pointer"
          src={thumbnail}
          alt={name}
          onClick={() => navigate(`/product/${_id}`)}
        />
        <div className="hidden group-hover:flex absolute w-full top-[78%] space-x-4">
          <Button
            className="h-10 w-full cursor-pointer hover:opacity-[88%] rounded flex justify-center items-center bg-primary"
            onClick={() => {
              isCarted ? handleDeleteFromCart() : handleAddToCart();
            }}
          >
            <ShoppingCart size={22} strokeWidth={1.5} color="#ffffff" />
            <span className="text-base text-white ml-2">
              {isCarted ? "Remove From Cart" : "Add To Cart"}
            </span>
          </Button>
        </div>

        <div className="h-8 w-8 p-1 rounded-full flex justify-center items-center bg-white bg-opacity-60 hover:bg-opacity-90 absolute top-2 right-2 transition-all">
          <Trash2
            className="cursor-pointer"
            size={22}
            strokeWidth={1.5}
            color="#000000"
            onClick={handleDeleteFromWishList}
          />
        </div>
      </div>

      <div className=" text-sm space-y-2">
        <p>{name}</p>
        <div className=" space-x-2">
          <span className="font-bold">${discountedPrice}</span>
          <strike className="text-xs text-neutral-400 strike">${price}</strike>
          <span className="text-primary font-medium">
            {Math.floor(discountPercentage)}% OFF
          </span>
        </div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((ele) => {
            const height = "1rem";
            const width = "1rem";

            if (ele <= rating)
              return <Star key={ele} heightInRem={height} widthInRem={width} />;
            else if (ele - rating < 1)
              return (
                <Star
                  key={ele}
                  heightInRem={height}
                  widthInRem={width}
                  half={true}
                />
              );
            else
              return (
                <Star
                  key={ele}
                  heightInRem={height}
                  widthInRem={width}
                  empty={true}
                />
              );
          })}
          {/* <span className="ml-2">({rating.count})</span> */}
        </div>
      </div>
    </div>
  );
};
