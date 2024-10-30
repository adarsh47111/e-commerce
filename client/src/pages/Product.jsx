import React, { useEffect, useRef, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import StarRating from "../components/StarRating";
import Seprator from "../components/Seprator";
import { Caravan, Heart, Minus, Plus, Repeat, Truck } from "lucide-react";
import Button from "../components/Button";
import ImageCarousel from "../components/ImageCarousel";
import { useParams } from "react-router-dom";
import {
  addToCart_api,
  addToWishlist_api,
  getProduct_api,
  removeFromCart_api,
  removeFromWishlist_api,
} from "../api";
import Skeleton from "../components/Skeleton";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import heartEmpty from "../../public/heart_empty.svg";
import heartFilled from "../../public/heart_filled.svg";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const { product_id } = useParams();

  console.log(product);

  useEffect(() => {
    (async () => {
      const { status, message, data } = await getProduct_api(
        user?._id,
        isLoggedIn,
        product_id
      );
      if (status === "success") {
        setProduct(data);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <ProductSkeleton />;
  }

  return (
    <div className="px-4 sm:px-20 py-4 space-y-4">
      <BreadCrumbs className="my-10" />
      <div className="flex flex-col sm:flex-row sm:space-x-12">
        {window.outerWidth < 640 ? (
          <ImageCarousel imageList={product?.images} />
        ) : (
          <ImageContainer imageList={product?.images} />
        )}
        <ProductInfo {...product} />
      </div>
    </div>
  );
};

export default Product;

const ImageContainer = ({ imageList }) => {
  if (imageList === undefined) return null;

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex space-x-3 w-fit">
      <div className="space-y-3">
        {imageList?.map((image, index) => {
          //   if (index === selectedImage) return null;

          return (
            <div
              key={index}
              className="p-4 bg-neutral-100 w-fit rounded cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <img className="h-20 w-20" src={image} alt="" />
            </div>
          );
        })}
      </div>
      <div className="p-4 bg-neutral-100 w-fit rounded">
        <img
          className="h-[28rem] w-[36rem]"
          src={imageList[selectedImage]}
          alt=""
        />
      </div>
    </div>
  );
};

// const ProductInfo = ({
//   name,
//   price,
//   quantity,
//   description,
//   rating,
//   attributes,
//   variants,
// }) => {
//   const [variantIdx, setVariantIdx] = useState(0);
//   const [selectedAttribute, setSelectedAttribute] = useState(() => {
//     let obj = {};
//     attributes.forEach(({ name, values }) => {
//       obj[name] = values[0];
//     });
//     console.log(obj);
//     return obj;
//   });

//   const getSelectedAttribute = (att_name, att_value) => {
//     let obj = { [att_name]: [att_value] };

//     variants.map(({ attributes }) => {
//       const isSameAttributeValue = attributes.some(
//         ({ name, value }) => name === att_name && value === att_value
//       );

//       if (isSameAttributeValue) {
//         attributes.forEach(({ name, value }) => {
//           if (name === att_name) return;
//           if (obj[name] === undefined) obj[name] = [value];
//           else obj[name] = [...obj[name], value];
//         });
//       }
//     });

//     return obj;
//   };

//   const [relatedAttribute, setrelatedAttribute] = useState(() =>
//     getSelectedAttribute(attributes[0].name, attributes[0].values[0])
//   );

//   const isAttributeValueSelected = () => {};

//   console.log(selectedAttribute);

//   price = variants !== null ? variants[variantIdx].price : price;
//   quantity = variants !== null ? variants[variantIdx].quantity : quantity;

//   return (
//     <div className="space-y-2 mt-2 w-full sm:w-[30%]">
//       <p className=" text-lg font-semibold">{name}</p>
//       <div className="flex items-center space-x-3">
//         <StarRating rating={rating} />
//         <span>|</span>
//         <span className=" text-green-400">In Stock</span>
//       </div>
//       <p className="text-xl">${price}</p>
//       <p className=" text-neutral-500 text-sm py-4">{description}</p>
//       <Seprator />

//       {attributes?.map(({ name, values }, index) => (
//         <div key={index} className="flex items-center space-x-2">
//           <span className="capitalize">{name}:</span>
//           {values?.map((val, index) =>
//             name.toLowerCase() === "color" ? (
//               <button
//                 key={index}
//                 className={`bg-white h-5 w-5 rounded-full p-1 ${
//                   true ? "border border-black" : ""
//                 }`}
//               >
//                 <div className="h-full w-full rounded-full bg-red-400"></div>
//               </button>
//             ) : (
//               <button
//                 key={index}
//                 className="border border-black rounded h-5 w-6 hover:h-6 hover:w-7 transition-all ease-linear text-xs"
//               >
//                 {val}
//               </button>
//             )
//           )}
//         </div>
//       ))}
//       <div className="flex space-x-4 py-2">
//         <CountBox />
//         <Button className="sm:text-sm">Add To Cart</Button>
//         <Button variant="outline">
//           <Heart size={17} strokeWidth={1.5} />
//         </Button>
//       </div>

//       <div className="border">
//         <div className="flex items-center px-4 py-2 space-x-3 border border-opacity-50 border-b-0 border-black">
//           <Truck size={25} strokeWidth={1.2} />
//           <div className="space-y-1">
//             <p className="text-sm font-medium">Free Delivery</p>
//             <p className="text-xs">We provide free delivery at your doorstep</p>
//           </div>
//         </div>
//         <div className="flex items-center px-4 py-2 space-x-3 border border-opacity-50 border-black">
//           <Repeat size={25} strokeWidth={1.2} />
//           <div className="space-y-1">
//             <p className="text-sm font-medium">Return Delivery</p>
//             <p className="text-xs">Free 30 Days Delivery Returns</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const ProductInfo = ({
  _id,
  name,
  description,
  rating,
  colors,
  wishlistItem_id,
}) => {
  const [cart, setCart] = useState(() =>
    colors.map((obj, index) => ({
      index,
      cartItem_id: obj.cartItem_id,
    }))
  );

  const [wishlist, setWishlist] = useState(wishlistItem_id);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const quantityRef = useRef(1);

  const price = colors[selectedColorIdx].price;
  const quantity = colors[selectedColorIdx].quantity;

  const handleAddtoCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add item to cart");
      return;
    }
    const { status, message, data } = await addToCart_api({
      token,
      product_id: _id,
      color: {
        color: colors[selectedColorIdx].color._id,
        price: colors[selectedColorIdx].price,
        quantity: colors[selectedColorIdx].quantity,
      },
      quantity: quantityRef.current,
    });

    if (status === "success") {
      setCart((prev) =>
        prev.map((obj) => {
          if (selectedColorIdx === obj.index)
            return { ...obj, cartItem_id: data._id };
          else return obj;
        })
      );
      toast.success(message);
    } else toast.error("Error: Item not added");
  };

  const handleRemoveFromCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add item to cart");
      return;
    }

    const cartItem = cart.find((obj) => selectedColorIdx === obj.index);
    const { status, message, data } = await removeFromCart_api(
      token,
      cartItem.cartItem_id
    );

    if (status === "success") {
      setCart((prev) =>
        prev.map((obj) => {
          if (selectedColorIdx === obj.index)
            return { ...obj, cartItem_id: null };
          else return obj;
        })
      );
      toast.success(message);
    } else toast.error("Error: Item not removed");
  };

  const handleAddToWishList = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add item to wishlist");
      return;
    }

    const { status, message, data } = await addToWishlist_api(token, _id);
    if (status === "success") {
      setWishlist(data._id);
      toast.success("Item added successfully");
    } else if (status === "error") toast.error("Error: Item not added");
  };

  const handleRemoveFromWishList = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to remove item from wishlist");
      return;
    }
    const { status, message, data } = await removeFromWishlist_api(
      token,
      wishlist
    );
    if (status === "success") {
      setWishlist(null);
      toast.success("Item removed successfully");
    } else if (status === "error") toast.error("Error: Item not removed");
  };

  return (
    <div className="space-y-2 mt-2 w-full sm:w-[30%]">
      <p className="text-lg font-semibold">{name}</p>
      <div className="flex items-center space-x-3">
        <StarRating rating={rating} />
        <span>|</span>
        <span className="text-green-400">In Stock</span>
      </div>
      <p className="text-xl">${price}</p>
      <p className="text-neutral-500 text-sm py-4">{description}</p>
      <Seprator />

      <div className="flex items-center space-x-2">
        <span className="capitalize">Color:</span>
        {colors.map(({ color }, index) => {
          const isSelected = selectedColorIdx === index;

          return (
            <button
              key={index}
              className={`bg-white h-5 w-5 rounded-full border
               ${isSelected ? "border-3 border-black p-1" : ""}
              `}
              onClick={() => setSelectedColorIdx(index)}
            >
              <div
                className={`h-full w-full rounded-full`}
                style={{ backgroundColor: color.code }}
              ></div>
            </button>
          );
        })}
      </div>
      <div className="flex space-x-4 py-2">
        <CountBox {...{ quantity, quantityRef }} />
        {(() => {
          const isCarted = cart.some(
            (obj) => obj.index === selectedColorIdx && obj.cartItem_id != null
          );

          return (
            <Button
              className="sm:text-sm"
              onClick={() => {
                if (isCarted) handleRemoveFromCart();
                else handleAddtoCart();
              }}
            >
              {isCarted ? "Remove From Cart" : "Add To Cart"}
            </Button>
          );
        })()}
        <Button variant="outline">
          {wishlist == undefined ? (
            <img
              className="h-5 w-5 cursor-pointer"
              src={heartEmpty}
              alt="whishlist"
              onClick={handleAddToWishList}
            />
          ) : (
            <img
              className="h-5 w-5 cursor-pointer"
              src={heartFilled}
              alt="whishlist"
              onClick={handleRemoveFromWishList}
            />
          )}
        </Button>
      </div>
      <div className="border">
        <div className="flex items-center px-4 py-2 space-x-3 border border-opacity-50 border-b-0 border-black">
          <Truck size={25} strokeWidth={1.2} />
          <div className="space-y-1">
            <p className="text-sm font-medium">Free Delivery</p>
            <p className="text-xs">We provide free delivery at your doorstep</p>
          </div>
        </div>
        <div className="flex items-center px-4 py-2 space-x-3 border border-opacity-50 border-black">
          <Repeat size={25} strokeWidth={1.2} />
          <div className="space-y-1">
            <p className="text-sm font-medium">Return Delivery</p>
            <p className="text-xs">Free 30 Days Delivery Returns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CountBox = ({ quantity, quantityRef }) => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    setCount(1);
  }, [quantity]);

  useEffect(() => {
    quantityRef.current = count;
  }, [count]);

  return (
    <div className="flex justify-between items-center border border-black border-opacity-35 rounded w-24 h-full">
      <button className="border-r border-black border-opacity-35 p-1 flex justify-center items-center hover:bg-primary hover:bg-opacity-80 cursor-pointer">
        <Minus
          size={20}
          strokeWidth={1.5}
          onClick={() => {
            if (count != 1) setCount((n) => n - 1);
          }}
        />
      </button>
      <span>{count}</span>
      <button className="border-l border-black border-opacity-35  p-1 flex justify-center items-center hover:bg-primary hover:bg-opacity-80 cursor-pointer">
        <Plus
          size={20}
          strokeWidth={1.5}
          onClick={() => {
            if (count < quantity) setCount((n) => n + 1);
          }}
        />
      </button>
    </div>
  );
};

const Carousel = ({ imageList }) => {
  if (imageList === undefined || imageList.length === 0) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [transtlateValue, setTranstlateValue] = useState(20);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const difference = touchStartX - touchEndX;
    const threshold = 100; // Adjust this value to set the threshold for swipe detection

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        // Swipe left, go to the next image
        setSelectedImage((prevIndex) =>
          prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        // Swipe right, go to the previous image
        setSelectedImage((prevIndex) =>
          prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
        );
      }
    }

    // Reset touch coordinates
    setTouchStartX(null);
    setTouchEndX(null);
  };

  //   console.log(touchStartX, touchEndX, transtlateValue);
  return (
    <div
      className="flex flex-col items-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        // className={`h-80 w-80 rounded-lg translate-x-[-${transtlateValue}%]`}
        className={`h-80 w-80 rounded-lg transition-transform ease-in-out delay-1000 duration-500 translate-x-[${transtlateValue}%]`}
        // className={`h-80 w-80 rounded-lg translate-x-[${transtlateValue}px]`}

        src={imageList[selectedImage]}
        alt="image"
      />
      <div className="flex items-center space-x-2 my-4">
        {imageList.map((ele, index) => (
          <div
            key={index}
            className={`${
              selectedImage === index ? "h-3 w-3" : "h-2 w-2"
            } rounded-full bg-neutral-400`}
          ></div>
        ))}
      </div>
      <button onClick={() => setTranstlateValue((n) => n + 1)}>
        inc {transtlateValue}
      </button>
    </div>
  );

  //   return (
  //     <div
  //       className="carousel-container"
  //       onTouchStart={handleTouchStart}
  //       onTouchMove={handleTouchMove}
  //       onTouchEnd={handleTouchEnd}
  //     >
  //       <div
  //         className="carousel-wrapper"
  //         style={{ transform: `translateX(-${selectedImage * 100}%)` }}
  //       >
  //         {imageList.map((src, index) => (
  //           <img
  //             key={index}
  //             className="carousel-slide"
  //             src={src}
  //             alt={`image-${index}`}
  //           />
  //         ))}

  //         <div className="flex items-center space-x-2 my-4">
  //           {imageList.map((ele, index) => (
  //             <div
  //               key={index}
  //               className={`${
  //                 selectedImage === index ? "h-3 w-3" : "h-2 w-2"
  //               } rounded-full bg-neutral-400`}
  //             ></div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
};

const ProductSkeleton = () => {
  return (
    <div className="px-4 sm:px-20 py-4 space-y-4 sm:mt-10">
      <div className="flex flex-col sm:flex-row sm:space-x-8 p-4 ">
        <div className="hidden sm:flex flex-col justify-between space-y-3">
          <Skeleton className="h-24 w-24" />
          <Skeleton className="h-24 w-24" />
          <Skeleton className="h-24 w-24" />
          <Skeleton className="h-24 w-24" />
        </div>
        <Skeleton className="h-60 w-full sm:h-[28rem] sm:w-[36rem]" />
        <div className="sm:w-[40%] space-y-3">
          <Skeleton className="hidden sm:block h-8 w-36" />
          <Skeleton className="h-8 w-44" />
          <Skeleton className="hidden sm:block h-20 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="hidden sm:block h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
};
