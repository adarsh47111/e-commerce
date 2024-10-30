import { SendHorizontal } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between px-28 py-20 h-fit border bg-black text-white">
      <div className=" space-y-3">
        <p className=" text-xl font-semibold">Exclusive</p>
        <p>Subscribe</p>
        <p>Get 10% off on your first order</p>
        <div className="p-2 border rounded flex items-center">
          <input
            className="bg-transparent"
            type="text"
            placeholder="Enter your email"
          />
          <SendHorizontal size={20} strokeWidth={1.5} />
        </div>
      </div>
      <div className=" space-y-3">
        <p className=" text-xl font-semibold">Support</p>
        <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>
      <div className=" space-y-3">
        <p className=" text-xl font-semibold">Account</p>
        <p>My account</p>
        <p>Login / Register</p>
        <p>Cart</p>
        <p>WishList</p>
      </div>
      <div className=" space-y-3">
        <p className=" text-xl font-semibold">Quick Links</p>
        <p>Privacy policy</p>
        <p>Terms of Use</p>
        <p>FAQ</p>
        <p>Contact</p>
      </div>
    </div>
  );
};

export default Footer;
