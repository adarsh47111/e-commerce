import React, { useEffect, useState } from "react";
import { createProduct_api, getAllCategories_api } from "../api";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { uploadFile } from "../FireBase";

const Seller = () => {
  const [product_info, setProduct_info] = useState({
    name: "Redmi Note 10",
    price: "249",
    description:
      "A popular mid-range smartphone from Redmi, known for its large display, long battery life, and impressive camera features at an affordable price point.",
    thumbnail: null,
    images: null,
    category: "",
    brand: "",
    variant: null,
  });

  const [variant, setVariant] = useState({
    name: "",
    options: {
      name: "",
      price: "",
      quantity: "",
    },
  });

  const [categoryList, setCategoryList] = useState(null);

  useEffect(() => {
    (async () => {
      const { status, message, data } = await getAllCategories_api();
      setCategoryList(data);
    })();
  }, []);

  console.log(product_info);

  // const handleImageInputChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const base64String = reader.result;
  //     console.log(base64String); // Do whatever you want with the base64 string
  //   };
  //   reader.readAsDataURL(file);
  // };

  const ImageToBase64 = (files) => {
    if (!files) return;

    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    return Promise.all(promises)
      .then((base64Strings) => {
        return base64Strings;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async (e) => {
    const imageList = [product_info.thumbnail, ...product_info.images];
    const base64Images = await ImageToBase64(imageList);

    const { status, message, data } = await createProduct_api({
      ...product_info,
      thumbnail: base64Images[0],
      images: base64Images.slice(1),
    });
    console.log(status, message, data);
    if (status === "success") toast.success(message);
    else toast.error(message);
  };

  // const upload = async () => {
  //   let imageList = [product_info.thumbnail, ...product_info.images];
  //   imageList = await ImageToBase64(imageList);

  //   const promises = Array.from(imageList).map((image) => {
  //     return new Promise((resolve, reject) => {
  //       let URL;

  //       uploadFile({
  //         path: "e_comm",
  //         fileName: Date.now() + "",
  //         file: image,
  //       }).then((url) => {
  //         resolve(url);
  //       });
  //     });
  //   });

  //   return Promise.all(promises)
  //     .then((results) => {
  //       return results;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const handleSubmit = async () => {
  //   const imageList = [product_info.thumbnail, ...product_info.images];
  //   const arr = await upload();

  //   console.log(arr);

  //   const { status, message, data } = await createProduct_api({
  //     ...product_info,
  //     thumbnail: arr[0],
  //     images: arr.slice(1),
  //   });
  //   console.log(status, message, data);
  //   if (status === "success") toast.success(message);
  //   else toast.error(message);
  // };

  return (
    <div className="flex">
      <div className="flex flex-col space-y-2 bg-neutral-950 h-screen text-red-500 w-1/2 px-4">
        <input
          className="border border-black m-3 p-3 w-full"
          type="text"
          placeholder="Name"
          value={product_info.name}
          onChange={(e) =>
            setProduct_info({ ...product_info, name: e.target.value })
          }
        />
        <input
          className="border border-black m-3 p-3 w-full"
          type="text"
          placeholder="description"
          value={product_info.description}
          onChange={(e) =>
            setProduct_info({
              ...product_info,
              description: e.target.value,
            })
          }
        />
        <input
          className="border border-black m-3 p-3 w-full"
          type="number"
          placeholder="price"
          value={product_info.price}
          onChange={(e) =>
            setProduct_info({
              ...product_info,
              price: e.target.value,
            })
          }
        />
        <input
          className="border border-black m-3 p-3 w-full"
          type="file"
          placeholder="thumbnail"
          accept="image/*"
          // value={product_info.thumbnail}
          onChange={(e) =>
            setProduct_info({
              ...product_info,
              thumbnail: e.target.files[0],
            })
          }
        />
        <input
          className="border border-black m-3 p-3 w-full"
          type="file"
          placeholder="images"
          accept="image/*"
          multiple
          // value={product_info.images}
          onChange={(e) =>
            setProduct_info({
              ...product_info,
              images: e.target.files,
            })
          }
        />
        <select
          className="border border-black m-3 p-3 w-[30%]"
          name="category"
          id=""
          value={product_info.category}
          onChange={(e) =>
            setProduct_info({
              ...product_info,
              category: e.target.value,
            })
          }
        >
          <option value="" disabled>
            Select a category
          </option>
          {categoryList?.map(({ _id, name }) => {
            return (
              <option key={_id} value={name} className=" capitalize">
                {name}
              </option>
            );
          })}
        </select>

        <select
          className="border border-black m-3 p-3 w-[30%]"
          name="brand"
          id=""
          value={product_info.category}
          onChange={(e) =>
            setProduct_info({
              ...product_info,
              brand: e.target.value,
            })
          }
        >
          <option value="" disabled>
            Select a brand
          </option>
          {categoryList?.map(({ _id, name }) => {
            return (
              <option key={_id} value={name} className=" capitalize">
                {name}
              </option>
            );
          })}
        </select>

        <Button className="p-4 w-20" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div className="flex flex-col w-1/2 border">
        <input
          className="border border-black m-3 p-3 w-[30%]"
          type="text"
          placeholder="variant name"
          value={variant.name}
          onChange={(e) => setVariant({ ...variant, name: e.target.value })}
        />
        <input
          className="border border-black m-3 p-3 w-[30%]"
          type="text"
          placeholder="variant option"
          value={variant.options.name}
          onChange={(e) =>
            setVariant({
              ...variant,
              options: { ...variant.options, name: e.target.value },
            })
          }
        />
        <input
          className="border border-black m-3 p-3 w-[30%]"
          type="number"
          placeholder="variant quantity"
          value={variant.options.quantity}
          onChange={(e) =>
            setVariant({
              ...variant,
              options: { ...variant.options, quantity: e.target.value },
            })
          }
        />
        <input
          className="border border-black m-3 p-3 w-[30%]"
          type="number"
          placeholder="variant price"
          value={variant.options.price}
          onChange={(e) =>
            setVariant({
              ...variant,
              options: { ...variant.options, price: e.target.value },
            })
          }
        />
        <Button
          onClick={() => {
            if (
              variant.name === "" ||
              variant.options.name === "" ||
              variant.options.price === "" ||
              variant.options.quantity === ""
            ) {
              toast.error("Please select a variant");
              return;
            }

            if (product_info.variant === null)
              setProduct_info({
                ...product_info,
                variant: [
                  {
                    name: variant.name,
                    options: [variant.options],
                  },
                ],
              });
            else {
              const varIdx = product_info.variant.findIndex(
                (v) => v.name === variant.name
              );

              if (varIdx !== -1) {
                const isOptionExists = product_info.variant[
                  varIdx
                ].options.some(
                  (option) => option.name === variant.options.name
                );

                if (isOptionExists) {
                  toast.error("Option already exists");
                  return;
                }
                product_info.variant[varIdx].options.push(variant.options);
              } else product_info.variant.push({
                name: variant.name,
                options: [variant.options],
              });
              setProduct_info(product_info);
            }
          }}
        >
          Add variant
        </Button>
      </div>
    </div>
  );
};

export default Seller;
