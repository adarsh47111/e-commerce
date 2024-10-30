import { useState } from "react";
import {
  CircleUserRound,
  Heart,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const iconList = [
    {
      name: "Whishlist",
      icon: (
        <Heart
          className="cursor-pointer"
          size={20}
          strokeWidth={1.5}
          onClick={() => navigate("/wishlist")}
        />
      ),
    },
    {
      name: "Cart",
      icon: (
        <ShoppingCart
          className="cursor-pointer"
          size={20}
          strokeWidth={1.5}
          onClick={() => navigate("/cart")}
        />
      ),
    },
    {
      name: "Profile",
      icon: (
        <CircleUserRound
          className="cursor-pointer"
          size={22}
          strokeWidth={1.5}
          // onClick={() => navigate(`/${isLoggedIn? "account":"login"}`)}
        />
      ),
    },
    {
      name: "Menu",
      icon: (
        <Menu
          className={`sm:hidden cursor-pointer transition-all ${
            menu ? "rotate-90" : ""
          }`}
          size={20}
          strokeWidth={1.5}
          onClick={() => setMenu((n) => !n)}
        />
      ),
    },
  ];
  return (
    <div className="border sticky top-0 bg-white z-10">
      <div className="flex justify-between items-center mt-4 mb-2 px-5 sm:px-20 border-bl bg-input">
        <span className=" text-xl font-semibold">Exclusive</span>
        <ul className="hidden space-x-6 sm:flex justify-between items-center">
          <li className="px-2 py-1 rounded transition ease-linear hover:bg-neutral-200">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="px-2 py-1 rounded transition ease-linear hover:bg-neutral-200">
            <NavLink to="#">Contact</NavLink>
          </li>
          <li className="px-2 py-1 rounded transition ease-linear hover:bg-neutral-200">
            <NavLink to="#">About</NavLink>
          </li>
          <li className="px-2 py-1 rounded transition ease-linear hover:bg-neutral-200">
            <NavLink to="#">Sign Up</NavLink>
          </li>
        </ul>
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center border rounded space-x-2 px-2 bg-neutral-100">
            <input
              type="text"
              className=" bg-transparent px-2 py-1 outline-none"
              placeholder="Search..."
            />
            <Search className="cursor-pointer" size={20} strokeWidth={1.5} />
          </div>
          {iconList.map(({ name, icon }, index) =>
            name == "Profile" ? (
              <Button
                key={index}
                variant={isLoggedIn ? "icon" : "outline"}
                className={"flex items-start gap-2 py-1"}
                onClick={() => navigate(`/${isLoggedIn ? "account" : "login"}`)}
              >
                {icon}
                {!isLoggedIn && (
                  <span className="text-sm font-semibold">Sign In</span>
                )}
              </Button>
            ) : (
              <Button key={index} variant={"icon"}>
                {icon}
              </Button>
            )
          )}
        </div>
      </div>
      {window.outerWidth < 640 ? (
        <div className="flex justify-between items-center border rounded w-[90%] px-2 mb-2 mx-auto bg-neutral-100">
          <input
            type="text"
            className=" bg-transparent w-full px-2 py-1 outline-none"
            placeholder="Search..."
          />
          <Search className="cursor-pointer" size={20} strokeWidth={1.5} />
        </div>
      ) : null}
      {menu && (
        <div className="flex flex-col items-center py-2 border">
          <ul className=" space-y-2" onClick={() => setMenu(false)}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="#">Contact</NavLink>
            </li>
            <li>
              <NavLink to="#">About</NavLink>
            </li>
            <li>
              <NavLink to="#">Sign Up</NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
