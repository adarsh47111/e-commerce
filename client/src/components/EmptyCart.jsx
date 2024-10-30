import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
    const navigate = useNavigate();
    
  return (
    <div className="flex flex-col justify-center items-center h-[36rem] gap-4">
      <img className="h-[20rem]" src="/cart_illustration.jpeg" alt="cart" />
      <div className="flex flex-col items-center text-lg font-medium">
        <p>Oops...</p>
        <p>Your cart is empty</p>
      </div>
      <Button variant={"outline"} onClick={() => navigate("/wishlist")}>
        Add Items From Wishlist
      </Button>
    </div>
  );
};

export default EmptyCart;

// wishlist_illustration;