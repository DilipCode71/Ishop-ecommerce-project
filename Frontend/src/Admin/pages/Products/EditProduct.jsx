import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../../../Context/Context";
import Select from "react-select";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react"; 
import { useSelector } from "react-redux";

const EditProduct = () => {
 const {
    toastMsg,
    API_BASE_URL,
    Product_URL,
    fetchAllCategory,
    fetchAllColor,
    fetchAllProduct,
    AllCategory,
    AllColor,
    AllProduct,
  } = useContext(MainContext);


  const admin=useSelector((state)=>state.admin)

  const [selectColor, setSelectColor] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [longDescription, setLongDescription] = useState(""); // 👈 Jodit state

  const { product_id } = useParams();
  const navigate = useNavigate();

  const productName = useRef();
  const productSlug = useRef();
  const Original_Price = useRef();
  const discount_percentage = useRef();
  const final_price = useRef();
  const short_description = useRef();
  const main_image = useRef();

  const addSlug = () => {
    const name = productName.current.value;
    productSlug.current.value = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  const calculateFinalPrice = () => {
    const original = parseFloat(Original_Price.current.value) || 0;
    const discount = parseFloat(discount_percentage.current.value) || 0;
    final_price.current.value = Math.round(original - (original * discount) / 100);
  };

  const editSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", productName.current.value);
    formData.append("slug", productSlug.current.value);
    formData.append("original_price", Original_Price.current.value);
    formData.append("discount_percentage", discount_percentage.current.value);
    formData.append("final_price", final_price.current.value);
    formData.append("short_description", short_description.current.value);
    formData.append("long_description", longDescription); // 👈 Jodit value
    formData.append("category_id", selectedCategory);
    formData.append("color", JSON.stringify(selectColor));

    if (main_image.current.files[0]) {
      formData.append("main_image", main_image.current.files[0]);
    }

    axios
      .put(`${API_BASE_URL}${Product_URL}/edit/${product_id}`, formData,{
        headers:{
          Authorization: `Bearer ${admin.token}`
        }
      })
      .then((res) => {
        toastMsg(res.data.msg, res.data.status);
        if (res.data.status === 1) {
          navigate("/admin/product");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllCategory();
    fetchAllColor();
    fetchAllProduct(product_id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (AllProduct && AllProduct._id) {
      setSelectedCategory(AllProduct.category_id);
      setSelectColor(AllProduct.color || []);
      setLongDescription(AllProduct.long_description || "");
      setIsDataLoaded(true);
    }
  }, [AllProduct]);

  if (!isDataLoaded) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-5 px-6 text-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">Edit Product</h2>
        </div>

        <form className="p-6 space-y-6" onSubmit={editSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">📦 Product Name</label>
              <input
                defaultValue={AllProduct.name}
                onChange={addSlug}
                type="text"
                ref={productName}
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">🔗 Slug</label>
              <input
                defaultValue={AllProduct.slug}
                ref={productSlug}
                type="text"
                readOnly
                className="w-full px-4 py-2 rounded border bg-gray-200"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">💲 Original Price</label>
              <input
                defaultValue={AllProduct.original_price}
                onChange={calculateFinalPrice}
                ref={Original_Price}
                type="number"
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">🏷️ Discount (%)</label>
              <input
                defaultValue={AllProduct.discount_percentage}
                onChange={calculateFinalPrice}
                ref={discount_percentage}
                type="number"
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">💰 Final Price</label>
              <input
                defaultValue={AllProduct.final_price}
                ref={final_price}
                readOnly
                type="number"
                className="w-full px-4 py-2 rounded border bg-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
            <label className="block mb-1">📁 Category</label>
            <Select
              value={
                selectedCategory
                  ? {
                      value: selectedCategory,
                      label:
                        AllCategory.find((c) => c._id === selectedCategory)?.CategoryName || "",
                    }
                  : null
              }
              onChange={(option) => setSelectedCategory(option.value)}
              options={AllCategory.map((cat) => ({
                value: cat._id,
                label: cat.CategoryName,
              }))}
            />
          </div>




              <div>
            <label className="block mb-1">🎨 Product Color</label>
            <Select
              isMulti
              value={selectColor.map((colorId) => {
                const color = AllColor.find((c) => c._id === colorId);
                return {
                  value: colorId,
                  label: color?.ColorName || "Unknown",
                };
              })}
              onChange={(selectedOptions) =>
                setSelectColor(selectedOptions.map((opt) => opt.value))
              }
              options={AllColor.map((color) => ({
                value: color._id,
                label: color.ColorName,
              }))}
            />
          </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">🖼️ Main Image</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="main_image"
                className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100"
              >
                <p className="text-sm text-gray-600">Click to upload or drag & drop</p>
                <input
                  ref={main_image}
                  id="main_image"
                  type="file"
                  name="main_image"
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex mt-4">
              <img
                src={`${API_BASE_URL}/images/products/${AllProduct.main_image}`}
                alt="Main"
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">📝 Short Description</label>
            <input
              defaultValue={AllProduct.short_description}
              ref={short_description}
              type="text"
              className="w-full px-4 py-2 rounded border border-gray-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">📄 Long Description</label>
            <JoditEditor
              value={longDescription}
              onChange={(newContent) => setLongDescription(newContent)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;


