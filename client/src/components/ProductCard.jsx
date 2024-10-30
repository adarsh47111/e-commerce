import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import heartEmpty from "../../public/heart_empty.svg";
import heartFilled from "../../public/heart_filled.svg";
import {
  addToCart_api,
  addToWishlist_api,
  removeFromCart_api,
  removeFromWishlist_api,
} from "../api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartState_Action,
  updateWishlistState_Action,
} from "../redux/slices/product";
import Star from "./Star";

const ProductCard = ({
  _id,
  name,
  thumbnail,
  price,
  discountPercentage = 20,
  rating = 3.5,
  wishlistItem_id,
  cartItem_id,
  cart = false,
}) => {
  const isWishlisted = useSelector((state) => {
    const prod = state.product.product_list.find((ele) => ele._id === _id);
    if (!("wishlistItem_id" in prod)) return false;
    return prod?.wishlistItem_id !== null;
  });

  const isCarted = useSelector((state) => {
    const prod = state.product.product_list.find((ele) => ele._id === _id);
    if (!("cartItem_id" in prod)) return false;
    return prod?.cartItem_id !== null;
  });

  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const discountedPrice = (() => {
    if (discountPercentage === 0) return price;
    return Math.ceil((price * (100 - discountPercentage)) / 100);
  })();

  const handleAddToWishList = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add item to wishlist");
      return;
    }
    const { status, message, data } = await addToWishlist_api(token, _id);
    if (status === "success") {
      dispatch(
        updateWishlistState_Action({
          product_id: _id,
          wishlistItem_id: data._id,
        })
      );
      toast.success("Item added successfully");
    } else if (status === "error") toast.error("Error: Item not added");
  };

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
        updateWishlistState_Action({
          product_id: _id,
          wishlistItem_id: null,
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
    const { status, message, data } = await addToCart_api({
      token,
      product_id: _id,
      quantity: 1,
    });
    if (status === "success") {
      dispatch(
        updateCartState_Action({
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
        updateCartState_Action({
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
          {cart ? (
            <Trash2
              className="cursor-pointer"
              size={22}
              strokeWidth={1.5}
              color="#000000"
            />
          ) : isWishlisted ? (
            <img
              className="min-h-5 min-w-5 cursor-pointer"
              src={heartFilled}
              alt="whishlist"
              onClick={handleDeleteFromWishList}
            />
          ) : (
            <img
              className="min-h-5 min-w-5 cursor-pointer"
              src={heartEmpty}
              alt="whishlist"
              onClick={handleAddToWishList}
            />
          )}
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

export default ProductCard;
