import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const EmptyWishlist = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-[36rem] gap-4">
      <img className="h-[20rem]" src="/wishlist_illustration.svg" alt="cart" />
      <div className="flex flex-col items-center text-lg font-medium">
        <p>Oops...</p>
        <p>Your whislist is empty</p>
      </div>
    </div>
  );
};

export default EmptyWishlist;

// wishlist_illustration;
