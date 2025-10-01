import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../../../Context/Context";
import Select from "react-select";
import axios from "axios";
import JoditEditor from "jodit-react"; // Import Jodit editor
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const {
    toastMsg,
    API_BASE_URL,
    Product_URL,
    fetchAllCategory,
    AllCategory,
    fetchAllColor,
    AllColor,
  } = useContext(MainContext);
  const admin=useSelector((state)=>state.admin)

  const [selectColor, setSelectColor] = useState([]);
  const [longDescription, setLongDescription] = useState(""); // State for the Jodit Editor content
  const navigate=useNavigate()

  const productName = useRef();
  const productSlug = useRef();
  const Original_Price = useRef();
  const discount_percentage = useRef();
  const final_price = useRef();
  const short_description = useRef();
  const main_image = useRef();

  const addSlug = () => {
    productSlug.current.value = productName.current.value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  const calculateFinalPrice = () => {
    const original = parseFloat(Original_Price.current.value) || 0;
    const discount = parseFloat(discount_percentage.current.value) || 0;
    const final = original - (original * discount) / 100;
    final_price.current.value = Math.round(final);
  };

  const productSubmit = (event) => {
    event.preventDefault();
    if (
      !productName.current?.value ||
      !productSlug.current?.value.trim() ||
      !Original_Price.current?.value.trim() ||
      !discount_percentage.current?.value.trim() ||
      !final_price.current?.value.trim() ||
      !short_description.current?.value.trim() ||
      !longDescription.trim() ||
      !event.target.category_id.value.trim() ||
      !selectColor.length
    ) {
      toastMsg("All fields are required", 0);
      return;
    }
    const formData = new FormData();

    formData.append("name", productName.current.value);
    formData.append("slug", productSlug.current.value);
    formData.append("original_price", Original_Price.current.value);
    formData.append("discount_percentage", discount_percentage.current.value);
    formData.append("final_price", final_price.current.value);
    formData.append("short_description", short_description.current.value);
    formData.append("long_description", longDescription); // Use state instead of ref for long description
    formData.append("category_id", event.target.category_id.value);
    formData.append("color", JSON.stringify(selectColor));

    const mainFile = main_image.current?.files?.[0];
    if (mainFile) {
      formData.append("main_image", mainFile);
    } else {
      toastMsg("Main image is required", 0);
      return;
    }

    axios
      .post(API_BASE_URL + Product_URL + `/create`, formData,{
        headers:{
          Authorization: `Bearer ${admin.token}`
        }
      })
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          event.target.reset();
          setLongDescription(""); 
          navigate("/admin/product")
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  useEffect(() => {
    fetchAllCategory();
    fetchAllColor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-5 px-6 text-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">Add New Product</h2>
        </div>

        {/* Form */}
        <form className="p-6 space-y-6" onSubmit={productSubmit}>
          {/* Basic Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                📦 Product Name
              </label>
              <input
                onChange={addSlug}
                type="text"
                ref={productName}
                name="name"
                placeholder="Enter product name"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                🔗 Slug
              </label>
              <input
                ref={productSlug}
                type="text"
                name="slug"
                placeholder="auto-generated-slug"
                readOnly
                className="w-full px-4 py-2 rounded border border-gray-200 bg-gray-200 outline-none"
              />
            </div>

            {/* Original Price */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                💲 Original Price
              </label>
              <input
                onChange={calculateFinalPrice}
                ref={Original_Price}
                type="number"
                name="original_price"
                placeholder="99.99"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Discount Percentage */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                🏷️ Discount (%)
              </label>
              <input
                onChange={calculateFinalPrice}
                ref={discount_percentage}
                type="number"
                name="discount_percentage"
                placeholder="20"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Final Price */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                💰 Final Price
              </label>
              <input
                ref={final_price}
                readOnly
                type="number"
                name="final_price"
                placeholder="79.99"
                className="w-full px-4 py-2 rounded border border-gray-300 bg-gray-300  focus:outline-none"
              />
            </div>
          </div>

          {/* Category and Color Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                📁 Category
              </label>
              <Select
                name="category_id"
                options={AllCategory.map((category) => {
                  return { value: category._id, label: category.CategoryName };
                })}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                🎨 Product Color
              </label>
              <Select
                onChange={(option) => {
                  const allColorId = option.map((data) => {
                    return data.value;
                  });
                  setSelectColor(allColorId);
                }}
                closeMenuOnSelect={false}
                isMulti
                options={AllColor.map((color) => {
                  return { value: color._id, label: color.ColorName };
                })}
              />
            </div>
          </div>

          {/* Main Image */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              🖼️ Main Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="main_image"
                className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition"
              >
                <div className="flex flex-col items-center justify-center pt-4 pb-4">
                  <svg
                    className="w-8 h-8 mb-1 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="text-sm text-gray-600">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-gray-400">
                    Only JPG, PNG (Max 2MB)
                  </p>
                </div>
                <input
                  ref={main_image}
                  id="main_image"
                  type="file"
                  name="main_image"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {fileName && (
              <p className="mt-2 text-sm text-green-600">📁 {fileName}</p>
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              📝 Short Description
            </label>
            <input
              ref={short_description}
              type="text"
              name="short_description"
              placeholder="Brief product description"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Long Description with Jodit Editor */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              📄 Long Description
            </label>
            <JoditEditor
              value={longDescription} // Bind the value to state
              onChange={(newContent) => {
                setLongDescription(newContent); // Update the state with new content
              }}
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              ➕ Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
