import React, { Fragment, useEffect, useRef, useState } from "react";
import { getBrands_api, getColors_api, getProducts_category_api } from "../api";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useParams } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProducts_Action } from "../redux/slices/product";
import RangeSlider from "../components/RangeSlider";

const Product_List = () => {
  const { product_list } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { category_id } = useParams();
  const filterRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status, message, data } = await getProducts_category_api(
        user?._id,
        isLoggedIn,
        category_id
      );
      if (status === "success") {
        {
          dispatch(
            setProducts_Action({
              products: data,
            })
          );
        }
      }

      setLoading(false);
    })();
  }, []);

  // useEffect(() => {
  //   if (!filterRef.current) return;

  //   const filterWrapper = filterRef.current;
  //   const filterContainer = filterWrapper.children[0];

  //   window.onscroll = () => {
  //     const scrollTop = window.scrollY;
  //     const viewportHeight = window.innerHeight;
  //     const filterHeight = filterContainer?.getBoundingClientRect().height;
  //     const filterTop =
  //       filterWrapper.getBoundingClientRect().top + window.pageYOffset + 10;

  //     if (scrollTop >= filterHeight - viewportHeight + filterTop) {
  //       filterContainer.style.transform = `translateY(-${
  //         filterHeight - viewportHeight + filterTop
  //       }px)`;
  //       filterContainer.style.position = "fixed";
  //     } else {
  //       filterContainer.style.transform = "";
  //       filterContainer.style.position = "";
  //     }
  //   };
  // }, [filterRef]);

  if (loading) return <Product_ListSkeleton />;

  return (
    <div className="relative flex w-full px-4 sm:px-20 py-4 space-x-4">
      <div ref={filterRef} className="w-[18rem]">
        <div className="w-full">
          <Filters {...{ category_id }} />
        </div>
      </div>
      <div className=" space-y-2">
        <Header />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {product_list?.map((product, index) => (
            <ProductCard key={product._id + `${index}`} {...product} />
          ))}
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Product_List;

const Header = () => {
  return (
    <div className="flex justify-between items-center border rounded-md px-10 py-2 w-full shadow-lg text-neutral-500">
      <p>Showing 1 - 10 of 120 results</p>
      <div className=" space-x-4">
        <span className="text-black font-semibold">Sort by:</span>
        <select className="border p-2 rounded-md">
          <option value="">Best Selling</option>
          <option value="">Price: High to Low</option>
          <option value="">Price: Low to High</option>
        </select>
      </div>
    </div>
  );
};

const Filters = ({ category_id }) => {
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [rangeVal, setRange] = useState([]);

  useEffect(() => {
    (async () => {
      const { status, message, data } = await getBrands_api(category_id);
      if (status === "success") {
        setBrands(data);
      }
    })();

    (async () => {
      const { status, message, data } = await getColors_api(category_id);
      if (status === "success") {
        setColors(data);
      }
    })();
  }, []);

  const filterList = [
    {
      name: "Brands",
      filters: brands ?? [],
    },
    // {
    //   name: "Product categories",
    //   filters: [
    //     { name: "Smartphones" },
    //     { name: "Laptops" },
    //     { name: "Tablets" },
    //     { name: "Cameras" },
    //     { name: "Headphones" },
    //     { name: "Smartwatches" },
    //     { name: "TVs" },
    //     { name: "Gaming Consoles" },
    //     { name: "Speakers" },
    //     { name: "Printers" },
    //   ],
    // },

    // {
    //   name: "Colors",
    //   filters: [
    //     { name: "Black" },
    //     { name: "White" },
    //     { name: "Red" },
    //     { name: "Blue" },
    //   ],
    // },
    // {
    //   name: "Filter By Stock",
    //   filters: [{ name: "In Stock" }, { name: "Out of Stock" }],
    // },
  ];

  return (
    <div className="w-[18rem] space-y-4">
      <div className="flex space-x-4">
        <Button className="flex-1">Filter</Button>
        <Button className=" flex-1">Reset</Button>
      </div>
      <RangeSlider {...{ rangeVal, setRange }} />
      {/* <FilterCard type="range" {...{ name: "Price Range" }} /> */}
      {/* {filterList?.map(({ name, filters }, index) => (
        <BrandCard key={index} type="checkbox" {...{ name, filters }} />
      ))} */}
      <BrandFilterCard {...{ brandsList: brands }} />
      <ColorFilterCard {...{ colorsList: colors }} />
    </div>
  );
};

// const FilterCard = ({ type, name, filters }) => {
//   const [range, setRange] = useState(500);
//   const [showAll, setShowAll] = useState(true);

//   filters = [...filters, ...filters, ...filters, ...filters];

//   console.log(filters);

//   if (type === "checkbox")
//     return (
//       <div className=" relative border rounded-md shadow p-4 space-y-4">
//         {showAll && (
//           <div className=" absolute w-full">
//             <BrandSelector filters={filters} />
//           </div>
//         )}
//         <p className="font-medium">{name}</p>
//         <div className="space-y-1">
//           {filters?.map((filter, index) => (
//             <div key={index} className="flex h-fit space-x-3">
//               <input
//                 className="cursor-pointer"
//                 type="checkbox"
//                 //   name="status"
//                 id={filter.name}
//               />
//               <label
//                 className="cursor-pointer text-sm text-neutral-500"
//                 htmlFor={filter.name}
//               >
//                 {filter.name}
//               </label>
//             </div>
//           ))}
//           <p>+ more</p>
//         </div>
//       </div>
//     );

//   if (type === "range")
//     return (
//       <div className="border rounded-md shadow p-4 space-y-4">
//         <p className="font-medium">{name}</p>
//         <div className="relative flex space-x-3">
//           <input
//             className="cursor-pointer  w-full h-1 bg-primary"
//             type="range"
//             min="500"
//             value={range}
//             onChange={(e) => setRange(e.target.value)}
//           />
//           <input
//             className="cursor-pointer absolute w-full h-1 bg-primary"
//             type="range"
//             value={range}
//             onChange={(e) => setRange(e.target.value)}
//           />
//         </div>
//         <div className="flex justify-between">
//           <span className="border rounded-md p-1 text-center min-w-12">
//             ${range}
//           </span>
//           <span className="border rounded-md p-1 text-center min-w-12">
//             $120
//           </span>
//         </div>
//       </div>
//     );
// };

const BrandFilterCard = ({ brandsList }) => {
  const [range, setRange] = useState(500);
  const [showAll, setShowAll] = useState(false);
  const [showSelector, setShowSelector] = useState(false);

  // filters = [
  //   ...filters,
  //   ...filters,
  //   ...filters,
  //   ...filters,
  //   ...filters,
  //   ...filters,
  //   ...filters,
  //   ...filters,
  // ];

  return (
    <div className="relative border rounded-md shadow p-4 space-y-4">
      <p className="font-medium">Brands</p>
      <div className="space-y-1">
        {brandsList
          .slice(0, showAll ? brandsList.length : 5)
          .map((filter, index) => (
            <div key={index} className="flex h-fit space-x-3">
              <input
                className="cursor-pointer"
                type="checkbox"
                id={filter.name}
              />
              <label
                className="cursor-pointer text-sm text-neutral-500"
                htmlFor={filter.name}
              >
                {filter.name}
              </label>
            </div>
          ))}
        {/* <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 cursor-pointer"
          >
            {showAll ? "Show less" : `+ more`}
          </button> */}
      </div>
      <button
        onClick={() => setShowSelector(!showSelector)}
        className="text-blue-500 cursor-pointer mt-2"
      >
        + more
      </button>
      {showSelector && (
        <div className="absolute top-0 left-0 ml-4l z-50">
          <BrandSelector {...{ brandsList, setShowSelector }} />
        </div>
      )}
    </div>
  );
};

const ColorFilterCard = ({ colorsList }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="relative border rounded-md shadow p-4 space-y-4">
      <p className="font-medium">Colors</p>
      <div className="space-y-1">
        {colorsList
          .slice(0, showAll ? colorsList.length : 5)
          .map((color, index) => (
            <div key={index} className="flex items-center h-fit space-x-3">
              <input
                className="cursor-pointer"
                type="checkbox"
                id={color.name}
              />
              <div
                className={`h-4 w-4 rounded-full border`}
                style={{ backgroundColor: color.code }}
              ></div>
              <label
                className="cursor-pointer text-sm text-neutral-500"
                htmlFor={color.name}
              >
                {color.name}
              </label>
            </div>
          ))}
        {/* <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 cursor-pointer"
          >
            {showAll ? "Show less" : `+ more`}
          </button> */}
      </div>
      {/* <button
        onClick={() => setShowSelector(!showSelector)}
        className="text-blue-500 cursor-pointer mt-2"
      >
        + more
      </button>
      {showSelector && (
        <div className="absolute top-0 left-0 ml-4l z-50">
          <BrandSelector {...{ brandsList, setShowSelector }} />
        </div>
      )} */}
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="flex space-x-4 pt-10">
      <Button className="flex">
        <ChevronLeft /> Previous
      </Button>
      <Button variant={"outline"} className="px-4">
        1
      </Button>
      <Button variant={"outline"} className="px-4">
        2
      </Button>
      <Button className="flex">
        <ChevronRight /> Previous
      </Button>
    </div>
  );
};

const Product_ListSkeleton = () => {
  return (
    <div className="relative flex w-full px-4 sm:px-20 py-4 space-x-4">
      <div className="w-[18rem] space-y-3 p-3 pt-0">
        <div className="flex justify-between w-full">
          <Skeleton className="h-10 w-[48%]" />
          <Skeleton className="h-10 w-[48%]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between w-full">
          <Skeleton className="h-10 w-[30%]" />
          <Skeleton className="h-10 w-[20%]" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((e, index) => (
            <div key={index} className="w-[12rem] space-y-2">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[50%]" />
            </div>
          ))}
        </div>
        {/* <Pagination /> */}
      </div>
    </div>
  );
};

// const BrandSelector = ({ filters }) => {
//   const [search, setSearch] = useState("");
//   const [selectedBrands, setSelectedBrands] = useState([]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const toggleBrand = (brandId) => {
//     setSelectedBrands((prevSelected) => {
//       if (prevSelected.includes(brandId)) {
//         return prevSelected.filter((id) => id !== brandId);
//       } else {
//         return [...prevSelected, brandId];
//       }
//     });
//   };

//   const filteredBrands = filters.filter((brand) =>
//     brand.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const groupByFirstLetter = (brands) => {
//     return brands.reduce((acc, brand) => {
//       const firstLetter = brand.name.charAt(0).toUpperCase();
//       if (!acc[firstLetter]) {
//         acc[firstLetter] = [];
//       }
//       acc[firstLetter].push(brand);
//       return acc;
//     }, {});
//   };

//   const groupedBrands = groupByFirstLetter(filteredBrands);

//   return (
//     <div className="p-4 bg-white">
//       <input
//         type="text"
//         placeholder="Search Brand"
//         value={search}
//         onChange={handleSearchChange}
//         className="w-full p-2 mb-4 border border-gray-300 rounded"
//       />
//       <div className="max-h-96 overflow-y-auto border border-gray-300 p-2 rounded">
//         {Object.keys(groupedBrands).map((letter) => (
//           <div key={letter} className="mb-4">
//             <h3 className="text-lg font-semibold mb-2">{letter}</h3>
//             {groupedBrands[letter].map((brand) => (
//               <div key={brand._id} className="flex items-center mb-1">
//                 <input
//                   type="checkbox"
//                   checked={selectedBrands.includes(brand._id)}
//                   onChange={() => toggleBrand(brand._id)}
//                   className="mr-2"
//                 />
//                 <label className="text-sm">{brand.name}</label>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const BrandSelector = ({ filters }) => {
//   const [search, setSearch] = useState("");
//   const [selectedBrands, setSelectedBrands] = useState([]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const toggleBrand = (brandId) => {
//     setSelectedBrands((prevSelected) => {
//       if (prevSelected.includes(brandId)) {
//         return prevSelected.filter((id) => id !== brandId);
//       } else {
//         return [...prevSelected, brandId];
//       }
//     });
//   };

//   const filteredBrands = filters.filter((brand) =>
//     brand.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const groupByFirstLetter = (brands) => {
//     return brands.reduce((acc, brand) => {
//       const firstLetter = brand.name.charAt(0).toUpperCase();
//       if (!acc[firstLetter]) {
//         acc[firstLetter] = [];
//       }
//       acc[firstLetter].push(brand);
//       return acc;
//     }, {});
//   };

//   const groupedBrands = groupByFirstLetter(filteredBrands);

//   return (
//     <div className=" max-w-[70rem] bg-white border border-gray-300 rounded shadow-lg z-50 p-4">
//       <input
//         type="text"
//         placeholder="Search Brand"
//         value={search}
//         onChange={handleSearchChange}
//         className="w-full p-2 mb-4 border border-gray-300 rounded"
//       />
//       <div className="flex flex-col gap-2 flex-wrap max-h-96 overflow-x-auto border border-gray-300 p-2 rounded">
//         {Object.keys(groupedBrands).map((letter) => (
//           // <div key={letter} className="mb-4 border">
//           <Fragment key={letter}>
//             <h3 className="text-lg font-semibold mb-2">{letter}</h3>
//             {groupedBrands[letter].map((brand) => (
//               <div key={brand._id} className="flex items-center mb-1">
//                 <input
//                   type="checkbox"
//                   checked={selectedBrands.includes(brand._id)}
//                   onChange={() => toggleBrand(brand._id)}
//                   className="mr-2"
//                 />
//                 <label className="text-sm">{brand.name}</label>
//               </div>
//             ))}
//           </Fragment>
//           // </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const BrandSelector = ({ brandsList, setShowSelector }) => {
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  console.log(selectedBrands);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleBrand = (brandId) => {
    setSelectedBrands((prevSelected) => {
      if (prevSelected.includes(brandId)) {
        return prevSelected.filter((id) => id !== brandId);
      } else {
        return [...prevSelected, brandId];
      }
    });
  };

  const filteredBrands = brandsList.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const groupByFirstLetter = (brands) => {
    return brands.reduce((acc, brand) => {
      const firstLetter = brand.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(brand);
      return acc;
    }, {});
  };

  const groupedBrands = groupByFirstLetter(filteredBrands);

  return (
    <div className="max-w-[70rem] bg-white border border-gray-300 rounded shadow-lg z-50 p-4">
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          placeholder="Search Brand"
          value={search}
          onChange={handleSearchChange}
          className="w-[50%] p-2 border border-gray-300 rounded"
        />
        <X
          className=" cursor-pointer"
          size={30}
          strokeWidth={1.5}
          onClick={() => setShowSelector((n) => !n)}
        />
      </div>
      <div className="flex flex-col flex-wrap gap-2 max-h-96 min-w-max overflow-y-auto border border-gray-300 p-2 rounded">
        {/* <div className="flex gap-2 overflow-x-auto"> */}
        {Object.keys(groupedBrands).map((letter) => (
          <Fragment key={letter}>
            {/* <div className="min-w-max"> */}
            <h3 className="text-lg font-semibold mx-3">{letter}</h3>
            {groupedBrands[letter].map((brand) => (
              <div key={brand._id} className="flex items-center mx-3">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand._id)}
                  onChange={() => toggleBrand(brand._id)}
                  className="mr-2"
                />
                <label className="text-sm text-neutral-400">{brand.name}</label>
              </div>
            ))}
            {/* </div> */}
          </Fragment>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};
