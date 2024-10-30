import { useEffect, useState } from "react";
import CategoryCarousel from "../components/CategoryCarousel";
import ProductCard from "../components/ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import { getAllProducts_api } from "../api";
import Skeleton from "../components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  resetProduct_list_Action,
  setProducts_Action,
} from "../redux/slices/product";

const Home = () => {
  return (
    <div className="px-4 sm:px-20 py-4 space-y-10">
      <div className="my-16">
        <SectionTag text="Categories" />
        <CategoryCarousel />
      </div>
      <ExploreProduct />
    </div>
  );
};

export default Home;

const SectionTag = ({ text }) => {
  return (
    <div className="flex items-center space-x-3 my-2">
      <div className="h-7 w-3 rounded bg-primary" />
      <span className="text-primary">{text}</span>
    </div>
  );
};

const ExploreProduct = () => {
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { product_list } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status, message, data } = await getAllProducts_api(
        user?._id,
        isLoggedIn
      );
      if (status === "success") {
        dispatch(
          setProducts_Action({
            products: data,
          })
        );
      }
      setLoading(false);
    })();

    return () => dispatch(resetProduct_list_Action());
  }, []);

  if (loading)
    return (
      <div>
        <SectionTag text="Our Products" />
        <div className="flex justify-between">
          <span className=" text-2xl font-semibold">Browse By Category</span>
          <div className="flex gap-3">
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-7 w-7 rounded-full" />
          </div>
        </div>
        <ExploreProductSkeleton />
      </div>
    );

  return (
    <div>
      <SectionTag text="Our Products" />
      {/* <div className="flex flex-wrap justify-start space-x-10"> */}
      <div>
        <div className="flex justify-between">
          <span className=" text-2xl font-semibold">Browse By Category</span>
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
                if (startIndex < categories.length - 7)
                  setStartIndex((n) => n + 1);
              }}
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {product_list?.map((product) => (
            <ProductCard
              key={product._id}
              {...{
                ...product,
                price: product.colors[0].price,
                quantity: product.colors[0].quantity,
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center my-8">
        <Button className="px-8">View All Products</Button>
      </div>
    </div>
  );
};

const ExploreProductSkeleton = () => {
  return (
    <div className="h-[30rem] w-full my-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((e, index) => (
          <div key={index} className="sm:w-48 space-y-2">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[50%]" />
          </div>
        ))}
      </div>
    </div>
  );
};
