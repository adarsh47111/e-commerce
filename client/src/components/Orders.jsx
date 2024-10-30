import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import {
  ChevronRight,
  PackageCheck,
  PackageX,
  Search,
  SlidersHorizontal,
  SquareX,
  Truck,
} from "lucide-react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

const Orders = () => {
  const [products, setProducts] = useState(null);
  const [openFilterMobileVersion, setOpenFilterMobileVersion] = useState(false);
  const isMobile = outerWidth < 640;

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=10")
      .then((res) => res.json())
      // .then(console.log);
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <>
      <div className="p-3 sm:p-0 sm:w-2/3">
        {/* Search and filter mobile version */}
        <div className="sm:hidden flex justify-between space-x-2">
          <div className="flex items-center border rounded space-x-2 bg-neutral-100">
            <input
              type="text"
              className=" bg-transparent px-2 w-[85%] py-1 outline-none"
              placeholder="Search..."
            />
            <Search className="cursor-pointer" size={20} strokeWidth={1.5} />
          </div>
          <Button
            className={"flex space-x-3"}
            onClick={() => setOpenFilterMobileVersion((n) => !n)}
          >
            <SlidersHorizontal size={18} strokeWidth={1.5} />
            <span>Filter</span>
          </Button>
        </div>

        <div className="flex justify-between">
          <p className="text-xl text-primary font-medium h-11">Orders</p>
          <div className="hidden sm:flex items-center border rounded space-x-2 px-2 bg-neutral-100">
            <input
              type="text"
              className=" bg-transparent px-2 py-1 outline-none"
              placeholder="Search..."
            />
            <Search className="cursor-pointer" size={20} strokeWidth={1.5} />
          </div>
        </div>
        <div className="bg-white">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              {...{ ...product, image: product.images[0], status: "delivered" }}
            />
          ))}
        </div>
      </div>
      {isMobile ? (
        <div
          className={
            openFilterMobileVersion
              ? "absolute h-screen w-screen top-0 bg-blue-900 bg-opacity-15"
              : ""
          }
        >
          <FilterPopUp
            open={openFilterMobileVersion}
            setOpen={setOpenFilterMobileVersion}
          />
        </div>
      ) : (
        <FilterMenu />
      )}
    </>
  );
};

export default Orders;

const ProductCard = ({ image, title, description, price, rating, status }) => {
  description =
    window.outerWidth < 640 ? description.slice(0, 30) + "..." : description;

  const StatusList = {
    arriving: {
      icon: <Truck size={25} strokeWidth={1.5} />,
      name: "Arriving",
      color: "#737373",
    },
    delivered: {
      icon: <PackageCheck size={25} strokeWidth={1.5} />,
      name: "Delivered",
      color: "#22c55e",
    },
    canceled: {
      icon: <PackageX size={25} strokeWidth={1.5} />,
      name: "Canceled",
      color: "#a65757",
    },
    returned: {
      icon: (
        <Truck className="transform scale-x-[-1]" size={25} strokeWidth={1.5} />
      ),
      name: "Returned",
      color: "#737373",
    },
  };

  return (
    <div className="border space-y-4 p-3 my-2 bg-white text-neutral-600 rounded shadow hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="">{StatusList[status].icon}</div>
        <div>
          <p
            className={`text-[${StatusList[status].color}] font-semibold leading-5 capitalize`}
          >
            {StatusList[status].name}
          </p>
          <p className=" text-neutral-500 text-sm">On wed, 13 Mar</p>
        </div>
      </div>
      <div className="rounded p-2 space-y-[2px]">
        <div className="flex items-center p-2 bg-neutral-100 relative space-x-4 rounded-md rounded-b-none">
          <div className="p-2 rounded">
            <img className="h-16 w-16" src={image} alt="" />
          </div>
          <div className="flex flex-col w-full justify-between">
            <p className="text-black font-semibold">{title}</p>
            <p className="text- w-[80%]">{description}</p>
            <p className="text-sm leading-7">${price}</p>
          </div>
          <ChevronRight
            className="absolute right-2"
            size={18}
            strokeWidth={1.5}
          />
        </div>
        <div className="flex my-4 p-2 items-center space-x-3 bg-neutral-100">
          <div className="h-2 w-2 rounded-full bg-black bg-opacity-50"></div>
          <p>Returned on 27 Mar</p>
        </div>
        <div className="bg-neutral-100 p-2 rounded-md rounded-t-none">
          Rate Product
        </div>
      </div>
    </div>
  );
};

const FilterMenu = ({ setOpenFilterMobileVersion }) => {
  const filterList = {
    status: ["All", "On the Way", "Delivered", "Cancelled", "Returned"],
    time: ["Anytime", "Last 30 days", "Last 6 months", "Last year"],
  };
  return (
    <div className="sm:w-1/3 h-fit mx-4 px-2 py-2 sm:border bg-neutral-50 text-neutral-600 rounded sm:shadow hover:shadow-md transition-shadow">
      <div className="flex sm:justify-center justify-between items-center h-10 border rounded px-2 mb-2 shadow">
        <span className=" text-black font-medium">Filters</span>
        {/* <Button className={"text-sm"}>Clear Filters</Button> */}
        <SquareX
          className="sm:hidden"
          size={20}
          strokeWidth={1.5}
          onClick={() => setOpenFilterMobileVersion((n) => !n)}
        />
      </div>
      <div className=" space-y-4">
        <div className=" space-y-2">
          <p className=" font-medium">Status</p>
          {filterList.status.map((status, index) => (
            <div key={index} className="flex space-x-3">
              <input
                className="cursor-pointer"
                type="radio"
                name="status"
                id={status}
              />
              <label className="cursor-pointer" htmlFor={status}>
                {status}
              </label>
            </div>
          ))}
        </div>
        <div className=" space-y-2">
          <p className=" font-medium">Time</p>
          {filterList.time.map((time, index) => (
            <div key={index} className="flex space-x-3">
              <input
                className="cursor-pointer"
                type="radio"
                name="status"
                id={time}
              />
              <label className="cursor-pointer" htmlFor={time}>
                {time}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex border rounded p-1 mt-2">
        <Button variant="ghost" className="w-[48%] text-primary">
          Apply Filters
        </Button>
        <div className="w-[1px] mx-1 bg-black opacity-10"></div>
        <Button variant="ghost" className="w-[48%] text-primary">
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

const FilterPopUp = ({ open, setOpen }) => {
  const filterPopUpRef = useRef(null);

  useEffect(() => {
    console.log(filterPopUpRef);
    if (open)
      filterPopUpRef.current && disableBodyScroll(filterPopUpRef.current);
    else filterPopUpRef.current && enableBodyScroll(filterPopUpRef.current);

    return () => clearAllBodyScrollLocks();
  }, [open]);

  return (
    <div
      ref={filterPopUpRef}
      className={`sm:hidden absolute top-0 bg-neutral-50 h-screen w-screen ${
        open
          ? "translate-y-[28%] z-50 transition-transform duration-500 ease-in-out"
          : "translate-y-full -z-50"
      }`}
    >
      <FilterMenu setOpenFilterMobileVersion={setOpen} />
    </div>
  );
};
