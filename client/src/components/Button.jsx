import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ children, variant, className, ...props }) => {
  const classes = (() => {
    switch (variant) {
      case "outline":
        return "outline sm:outline-2 outline-primary hover:bg-red-50";
      case "icon":
        return "px-0 py-0 hover:bg-neutral-100 rounded-full";
      case "ghost":
        return "hover:bg-neutral-100";
      default:
        return "bg-primary text-white";
    }
  })();

  return (
    <button
      className={twMerge(
        `text-sm sm:text-base rounded px-2 py-2 w-fit hover:opacity-[88%] transition`,
        classes,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
