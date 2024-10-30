import { useEffect, useRef, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import {
  ArrowLeft,
  BookUser,
  ChevronRight,
  CreditCard,
  LogOut,
  Package,
  SquareUserRound,
  SquareX,
  Undo2,
} from "lucide-react";
import Button from "../components/Button";
import Seprator from "../components/Seprator";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Account = () => {
  return (
    <>{window.outerWidth < 640 ? <MobileVersion /> : <DeskTopVersion />}</>
  );
};

export default Account;

const Sidebar = ({ baseAccountPath }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const paths = pathname.split("/");
    const lastPath = paths[paths.length - 1];

    if (lastPath === "account") navigate(`${pathname}/profile`);
  }, []);

  const currentTab = (() => {
    const paths = pathname.split("/");
    return paths[paths.length - 1];
  })();

  return (
    <div className="space-y-3 w-1/4">
      <div>
        <p className=" font-medium">Manage Account</p>
        <div className="pl-6 py-2 text-neutral-600 text-sm leading-6">
          <p
            className={`${
              currentTab === "profile" ? "text-primary" : ""
            } cursor-pointer`}
            onClick={() => navigate(`${baseAccountPath}/profile`)}
          >
            Profile
          </p>
          <p
            className={`${
              currentTab === "address" ? "text-primary" : ""
            } cursor-pointer`}
            onClick={() => navigate(`${baseAccountPath}/address`)}
          >
            Address Book
          </p>
          <p
            className={`${
              currentTab === "payment" ? "text-primary" : ""
            } cursor-pointer`}
            onClick={() => navigate(`${baseAccountPath}/payment`)}
          >
            Payment Options
          </p>
        </div>
      </div>
      <div>
        <p className=" font-medium">My Orders</p>
        <div className="pl-6 py-2 text-neutral-600 text-sm leading-6">
          <p
            className={`${
              currentTab === "returns" ? "text-primary" : ""
            } cursor-pointer`}
            onClick={() => navigate(`${baseAccountPath}/orders`)}
          >
            Orders
          </p>
          {/* <p
            className={`${
              currentTab === "Cancellations" ? "text-primary" : ""
            } cursor-pointer`}
            onClick={() => navigate(`${baseAccountPath}/cancellations`)}
          >
            Cancellations
          </p> */}
        </div>
      </div>
    </div>
  );
};

const DeskTopVersion = () => {
  const { pathname } = useLocation();
  const baseAccountPath = useRef(pathname);
  return (
    <>
      <div className="px-4 sm:px-40 py-4">
        <div className="flex justify-between my-16">
          <BreadCrumbs />
          <p>
            Welcome! <span className="text-primary">Adarsh Goutam</span>
          </p>
        </div>
        <div className="flex">
          <Sidebar baseAccountPath={baseAccountPath.current} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

const MobileVersion = () => {
  const { pathname } = useLocation();

  const currentTab = (() => {
    const paths = pathname.split("/");
    return paths[paths.length - 1];
  })();

  return (
    <>{currentTab === "account" ? <SidebarMobileVersion /> : <Outlet />}</>
  );
};

const SidebarMobileVersion = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const TabList = [
    {
      icon: <SquareUserRound size={25} strokeWidth={1.5} />,
      name: "profile",
      label: "Profile",
    },
    { name: "seprator" },

    {
      icon: <BookUser size={25} strokeWidth={1.5} />,
      name: "address",
      label: "Address Book",
    },
    {
      icon: <CreditCard size={25} strokeWidth={1.5} />,
      name: "payment",
      label: "Payment Options",
    },
    { name: "seprator" },
    {
      icon: <Package size={25} strokeWidth={1.5} />,
      name: "orders",
      label: "Orders",
    },
    // {
    //   icon: <SquareX size={25} strokeWidth={1.5} />,
    //   name: "cancellations",
    //   label: "Cancellations",
    // },
  ];

  return (
    <div>
      <div className="flex justify-between items-center  w-[60%] pl-4 py-3">
        <Button variant="icon">
          <ArrowLeft
            size={25}
            strokeWidth={2}
            onClick={() => window.history.back()}
          />
        </Button>
        <span className="text-xl font-bold">Account</span>
      </div>
      {TabList.map(({ icon, name, label }, index) =>
        name == "seprator" ? (
          <Seprator key={index} className="my-[0px] h-[4px] opacity-10" />
        ) : (
          <div
            key={index}
            className="flex justify-between items-center p-6 border hover:bg-black hover:bg-opacity-5"
            onClick={() => navigate(`${pathname}/${name}`)}
          >
            <div className="flex items-center space-x-4">
              {icon}
              <span className="select-none">{label}</span>
            </div>
            <ChevronRight className="opacity-20" size={25} strokeWidth={2} />
          </div>
        )
      )}
      <div className="flex justify-between items-center p-6 border-t hover:bg-black hover:bg-opacity-5">
        <div className="flex items-center space-x-4">
          <LogOut size={25} strokeWidth={1.5} color="#e01c47" />
          <span className="text-primary">Logout</span>
        </div>
      </div>
    </div>
  );
};
