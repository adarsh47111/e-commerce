import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { CirclePlus, CircleX, Flame, Trash2 } from "lucide-react";
import {
  createProduct_api,
  getAllBrands_api,
  getAllCategories_api,
  getAllColors_api,
} from "../../api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Product_admin = () => {
  const [categoryList, setCategoryList] = useState(null);
  const [brandList, setBrandList] = useState(null);
  const [colorList, setColorList] = useState(null);

  const [productType, setProductType] = useState("single");
  const [attributeCount, setAttributeCount] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([
    { id: uuidv4(), color_id: "", price: null, quantity: null },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "a@g.com",
      description: "123456",
    },
  });

  const submit = async (formData) => {
    let data = {
      ...formData,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4",
      images: [
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4",
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4",
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4",
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4",
      ],
      colors,
    };
    console.log(data);

    const { status, message } = await createProduct_api(data);
    if (status === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    (async () => {
      const { status, message, data } = await getAllCategories_api();
      if (status === "success") {
        setCategoryList(data);
      }
    })();

    (async () => {
      const { status, message, data } = await getAllBrands_api();
      if (status === "success") {
        setBrandList(data);
      }
    })();

    (async () => {
      const { status, message, data } = await getAllColors_api();
      if (status === "success") {
        setColorList(data);
      }
    })();
  }, []);

  // useEffect(() => {
  //   // Generate variants based on attributes
  //   const generateVariants = () => {
  //     if (attributes.length === 0) {
  //       setVariants([]);
  //       return;
  //     }

  //     const attributeValues = attributes.map((attr) => attr.values);
  //     const allCombinations = getAllCombinations(attributeValues);
  //     const newVariants = allCombinations.map((combination) => {
  //       return {
  //         attributes: attributes.map((attr, index) => ({
  //           name: attr.name,
  //           value: combination[index],
  //         })),
  //         price: 0,
  //         quantity: 0,
  //       };
  //     });
  //     setVariants(newVariants);
  //   };

  //   generateVariants();
  // }, [attributes]);

  return (
    <div className="bg-blue-500 bg-opacity-10 min-h-screen p-4 space-y-4">
      <div>
        <p className="text-2xl font-bold">Add Product</p>
      </div>
      <div className="flex gap-4">
        <div className="bg-white rounded-lg w-1/2 p-4 space-y-4 shadow">
          <div className="flex flex-col gap-2">
            <label className=" font-medium">
              Product name <span className="text-red-600">*</span>
            </label>
            <input
              className="h-10 border rounded-lg p-4"
              type="text"
              placeholder="Enter product name"
              {...register("name", { required: "Product name is required" })}
            />
            <p className=" opacity-35 text-sm">
              Do not exceed 20 characters when entering the product name.
            </p>
            {errors.name && (
              <p className="text-sm font-medium p-2 text-primary">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className=" font-medium">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              className="h-10 border rounded-lg px-4"
              defaultValue=""
              {...register("category", { required: "Category is required" })}
            >
              <option value="" disabled hidden>
                Choose Category
              </option>
              {categoryList?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm font-medium p-2 text-primary">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className=" font-medium">
              Brand <span className="text-red-600">*</span>
            </label>
            <select
              className="h-10 border rounded-lg px-4"
              defaultValue=""
              {...register("brand", { required: "Brand is required" })}
            >
              <option value="" disabled hidden>
                Choose Brand
              </option>
              {brandList?.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brand && (
              <p className="text-sm font-medium p-2 text-primary">
                {errors.brand.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className=" font-medium">
              description <span className="text-red-600">*</span>
            </label>
            <textarea
              className="h-52 border rounded-lg p-4"
              type="text"
              placeholder="Write a description about this product"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-sm font-medium p-2 text-primary">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between bg-white rounded-lg w-1/2 p-4 shadow">
          <div className="space-y-4">
            <div className=" space-y-2">
              <label className=" font-medium">Upload Images</label>
              <div className="h-60 border rounded-lg">
                <input
                  className="border"
                  type="text"
                  placeholder="Url"
                  {...register("url")}
                />
              </div>
            </div>

            <div className=" space-y-2">
              <label className="font-medium">Colors</label>
              <div className="p-4 h-60l w-full border rounded-lg space-y-2">
                {colors.map(({ id }) => (
                  <ColorInputBox
                    key={id}
                    {...{ id, colors, setColors, colorList }}
                  />
                ))}
                {colors.length !== 3 && (
                  <Button
                    className={"flex items-center gap-2"}
                    variant={"ghost"}
                    onClick={() => {
                      if (colors.length == 3) return;
                      setColors([
                        ...colors,
                        {
                          id: uuidv4(),
                          color_id: "",
                          price: null,
                          quantity: null,
                        },
                      ]);
                    }}
                  >
                    <CirclePlus size={20} strokeWidth={1.5} />
                    Add Attributes
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Button className={"mt-2"} onClick={handleSubmit(submit)}>
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product_admin;

const Variant_Table = ({ register, variants, setVariants }) => {
  const handleQuantityChange = (index, value) => {
    const newVariants = [...variants];
    newVariants[index].quantity = Number(value);
    setVariants(newVariants);
  };

  const handlePriceChange = (index, value) => {
    const newVariants = [...variants];
    newVariants[index].price = Number(value);
    setVariants(newVariants);
  };

  const handleRemoveVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  return (
    <div className="container mx-auto bg-white rounded-lg p-4 space-y-4 shadow">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Variant Name</th>
            <th className="py-2 px-4 border-b text-left">Quantity</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left"></th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4 flex items-center">
                <div>
                  <div className="font-semibold">
                    {variant.attributes
                      .map((attr) => `${attr.value}`)
                      .join("/")}
                  </div>
                </div>
              </td>
              <td className="py-2 px-4">
                <input
                  className="bg-black bg-opacity-5 rounded h-full p-2"
                  type="number"
                  value={variant.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  className="bg-black bg-opacity-5 rounded h-full p-2"
                  type="number"
                  value={variant.price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                />
              </td>
              <td className="py-2 px-4">
                <Trash2
                  className="ml-auto cursor-pointer"
                  size={20}
                  onClick={() => handleRemoveVariant(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ColorInputBox = ({ id, colors, setColors, colorList }) => {
  const [values, setValues] = useState({
    color_id: "",
    price: "",
    quantity: "",
  });
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    const color = colors.find((obj) => obj.id === id);
    if (color) {
      setValues({
        color_id: color.color_id,
        price: color.price,
        quantity: color.quantity,
      });
    }
  }, [id, colors]);

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddColor = () => {
    setColors((prevColors) =>
      prevColors.map((obj) =>
        obj.id === id
          ? {
              id,
              color_id: values.color_id,
              price: values.price,
              quantity: values.quantity,
            }
          : obj
      )
    );
    setEdit(false);
  };

  const handleDeleteColor = () => {
    setColors((prevColors) => prevColors.filter((obj) => obj.id !== id));
  };

  return (
    <div className="flex items-center justify-evenly gap-2 w-fit">
      <CircleX onClick={handleDeleteColor} size={20} strokeWidth={1.5} />
      <select
        className="h-10 border rounded-lg px-4"
        defaultValue=""
        onChange={(e) => handleChange("color_id", e.target.value)}
      >
        <option value="" disabled hidden>
          Choose color
        </option>
        {colorList?.map((color) => (
          <option key={color._id} value={color._id}>
            {color.name}
          </option>
        ))}
      </select>
      <input
        className="h-10 border rounded-lg p-2"
        type="text"
        placeholder="price"
        value={values.price}
        readOnly={!edit}
        onChange={(e) => handleChange("price", e.target.value)}
      />
      <input
        className="h-10 border rounded-lg p-2"
        type="text"
        placeholder="quantity"
        value={values.quantity}
        readOnly={!edit}
        onChange={(e) => handleChange("quantity", e.target.value)}
      />
      {edit ? (
        <Button onClick={handleAddColor}>Add</Button>
      ) : (
        <Button onClick={() => setEdit(true)}>Edit</Button>
      )}
    </div>
  );
};

const getAllCombinations = (arrays) => {
  if (arrays.length === 0) return [[]];
  const [first, ...rest] = arrays;
  const combinationsWithoutFirst = getAllCombinations(rest);
  return first.flatMap((e) => combinationsWithoutFirst.map((c) => [e, ...c]));
};
