import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Gamepad2,
  Headphones,
  Laptop,
  Shirt,
  Smartphone,
  Tv,
  Watch,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { getCategories_api } from "../api";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = window.outerWidth < 640 ? 3 : 7;
  // const categoryIcon = [
  //   {
  //     id: 0,
  //     name: "Phone",
  //     icon: <Smartphone size={50} strokeWidth={0.6} />,
  //   },
  //   {
  //     id: 1,
  //     name: "Gaming",
  //     icon: <Gamepad2 size={50} strokeWidth={0.6} />,
  //   },
  //   {
  //     id: 2,
  //     name: "Computer",
  //     icon: <Laptop size={50} strokeWidth={0.6} />,
  //   },
  //   {
  //     id: 3,
  //     name: "SmartWatch",
  //     icon: <Watch size={50} strokeWidth={0.6} />,
  //   },
  //   { id: 4, name: "Camera", icon: <Camera size={50} strokeWidth={0.6} /> },
  //   {
  //     id: 5,
  //     name: "HeadPhones",
  //     icon: <Headphones size={50} strokeWidth={0.6} />,
  //   },
  //   {
  //     id: 6,
  //     name: "TV",
  //     icon: <Tv size={50} strokeWidth={0.6} />,
  //   },
  //   {
  //     id: 7,
  //     name: "Clothes",
  //     icon: <Shirt size={50} strokeWidth={0.6} />,
  //   },
  // ];

  const categoryIcon = {
    Smartphones: <Smartphone size={50} strokeWidth={0.6} />,
    Gaming: <Gamepad2 size={50} strokeWidth={0.6} />,
    Laptops: <Laptop size={50} strokeWidth={0.6} />,
    SmartWatch: <Watch size={50} strokeWidth={0.6} />,
    "Cameras & Photography": <Camera size={50} strokeWidth={0.6} />,
    Headphones: <Headphones size={50} strokeWidth={0.6} />,
    TV: <Tv size={50} strokeWidth={0.6} />,
    "Clothing & Accessories": <Shirt size={50} strokeWidth={0.6} />,
  };

  const [categoryList, setCategoryList] = useState(null);

  useEffect(() => {
    (async () => {
      const { status, message, data } = await getCategories_api([
        "Smartphones",
        "Gaming",
        "Laptops",
        "SmartWatch",
        "Cameras & Photography",
        "Headphones",
        "TV",
        "Clothing & Accessories",
      ]);
      setCategoryList(data);
    })();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <span className="text-xl sm:text-2xl font-semibold">
          Browse By Category
        </span>
        <div className="flex space-x-2">
          <div
            className="bg-neutral-100 hover:bg-neutral-200 transition p-2 rounded-full cursor-pointer"
            onClick={() => {
              if (startIndex > 0) setStartIndex((n) => n - 1);
            }}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
          </div>
          <div
            className="bg-neutral-100 hover:bg-neutral-200 transition p-2 rounded-full cursor-pointer"
            onClick={() => {
              if (startIndex < categoryList.length - visibleCount)
                setStartIndex((n) => n + 1);
            }}
          >
            <ArrowRight size={16} strokeWidth={1.5} />
          </div>
        </div>
      </div>
      <div className="flex justify-between space-x-4 sm:space-x-10 overflow-autoh">
        {categoryList?.map(({ _id, name }, idx) =>
          idx >= startIndex && idx < startIndex + visibleCount ? (
            <div
              key={_id}
              className="h-32 w-40 sm:h-40 sm:w-40 border flex flex-col justify-center items-center space-y-4 rounded cursor-pointer hover:opacity-60 transition-opacity"
              onClick={() => navigate(`/product_list/${_id}`)}
            >
              {categoryIcon[name]}
              <p className="text-center">{name}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default CategoryCarousel;
