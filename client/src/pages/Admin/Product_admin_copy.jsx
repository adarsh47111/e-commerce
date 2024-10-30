import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { CirclePlus, CircleX, Flame, Trash2 } from "lucide-react";
import {
  createProduct_api,
  getAllBrands_api,
  getAllCategories_api,
} from "../../api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Product_admin = () => {
  const [categoryList, setCategoryList] = useState(null);
  const [brandList, setBrandList] = useState(null);
  const [productType, setProductType] = useState("single");
  const [attributeCount, setAttributeCount] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const [variants, setVariants] = useState([]);

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
      price: null,
      quantity: null,
      attributes: null,
      variants: null,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4",
      images: [
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4",
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4",
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4",
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4",
      ],
    };

    if (productType === "variant") {
      data = {
        ...data,
        attributes: attributes.map(({ name, values }) => ({
          name,
          values,
        })),
        variants,
      };
    } else
      data = {
        ...data,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
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
  }, []);

  useEffect(() => {
    // Generate variants based on attributes
    const generateVariants = () => {
      if (attributes.length === 0) {
        setVariants([]);
        return;
      }

      const attributeValues = attributes.map((attr) => attr.values);
      const allCombinations = getAllCombinations(attributeValues);
      const newVariants = allCombinations.map((combination) => {
        return {
          attributes: attributes.map((attr, index) => ({
            name: attr.name,
            value: combination[index],
          })),
          price: 0,
          quantity: 0,
        };
      });
      setVariants(newVariants);
    };

    generateVariants();
  }, [attributes]);

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

            <div>
              <label className="font-medium">Product Type</label>
              <div className="flex justify-between">
                <div
                  className={`${
                    productType === "single" ? "border border-primary" : ""
                  } h-40 w-[48%] border rounded-lg flex justify-center items-center hover:bg-black hover:bg-opacity-20`}
                  onClick={() => setProductType("single")}
                >
                  Single Product
                </div>
                <div
                  className={`${
                    productType === "variant" ? "border border-primary" : ""
                  } h-40 w-[48%] border rounded-lg flex justify-center items-center hover:bg-black hover:bg-opacity-20`}
                  onClick={() => setProductType("variant")}
                >
                  Variant Product
                </div>
              </div>
            </div>

            {productType === "variant" && (
              <div className=" space-y-2">
                <label className="font-medium">Attributes</label>
                <div className="p-4 h-60l border rounded-lg space-y-2">
                  {attributes.map(({ id }) => (
                    <AttributeBox
                      key={id}
                      {...{ id, attributes, setAttributes, setAttributeCount }}
                    />
                  ))}
                  {attributes.length !== 3 && (
                    <Button
                      className={"flex items-center gap-2"}
                      variant={"ghost"}
                      onClick={() => {
                        if (attributes.length == 3) return;
                        setAttributes([
                          ...attributes,
                          { id: uuidv4(), name: "", values: [] },
                        ]);
                      }}
                    >
                      <CirclePlus size={20} strokeWidth={1.5} />
                      Add Attributes
                    </Button>
                  )}
                </div>
              </div>
            )}

            {productType === "single" && (
              <div>
                <div className="flex flex-col gap-2">
                  <label className=" font-medium">
                    Price<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="h-10 border rounded-lg p-4"
                    type="number"
                    placeholder="Enter product price"
                    {...register("price", {
                      required: "Product price is required",
                    })}
                  />
                  {errors.price && (
                    <p className="text-sm font-medium p-2 text-primary">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className=" font-medium">
                    Quantity<span className="text-red-600">*</span>
                  </label>
                  <input
                    className="h-10 border rounded-lg p-4"
                    type="number"
                    placeholder="Enter product quantity"
                    {...register("quantity", {
                      required: "Product quantity is required",
                    })}
                  />
                  {errors.quantity && (
                    <p className="text-sm font-medium p-2 text-primary">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <Button className={"mt-2"} onClick={handleSubmit(submit)}>
            Add Product
          </Button>
        </div>
      </div>
      {variants.length > 0 && (
        <Variant_Table {...{ register, variants, setVariants }} />
      )}
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

const AttributeBox = ({ id, attributes, setAttributes, setAttributeCount }) => {
  const [atb, setAtb] = useState({ name: "", values: "" });
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    const attribute = attributes.find((attr) => attr.id === id);
    if (attribute) {
      setAtb({
        name: attribute.name,
        values: attribute.values.join(", "),
      });
    }
  }, [id, attributes]);

  const handleChange = (field, value) => {
    setAtb((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAttribute = () => {
    setAttributes((prevAttributes) =>
      prevAttributes.map((attr) =>
        attr.id === id
          ? {
              ...attr,
              name: atb.name,
              values: atb.values.split(",").map((val) => val.trim()),
            }
          : attr
      )
    );
    setEdit(false);
  };

  const handleDeleteAttribute = () => {
    setAttributes((prevAttributes) =>
      prevAttributes.filter((attr) => attr.id !== id)
    );
    setAttributeCount((count) => count - 1);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <CircleX onClick={handleDeleteAttribute} size={20} strokeWidth={1.5} />
      <input
        className="h-10 border rounded-lg p-4 flex-1"
        type="text"
        placeholder="Attribute Name"
        value={atb.name}
        readOnly={!edit}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <input
        className="h-10 border rounded-lg p-4 flex-1"
        type="text"
        placeholder="Attribute Values"
        value={atb.values}
        readOnly={!edit}
        onChange={(e) => handleChange("values", e.target.value)}
      />
      {edit ? (
        <Button onClick={handleAddAttribute}>Add</Button>
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
