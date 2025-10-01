import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import Slider from "react-slick";
import { FaThLarge, FaList } from "react-icons/fa";
import { Filter, ShoppingBag, Smartphone, Search, Star, X } from "lucide-react";
import { MainContext } from "../../Context/Context";
import {
  IoIosArrowDown,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { Truck, CheckCircle } from "lucide-react";
import ProductSlider from "./ProductSlider";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/reducer/CartSlice";
import axios from "axios";
import { formatPriceINR } from "../../helper";

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-[#91D7E8] lg:bg-white 
                 h-10 w-10 lg:h-24 lg:w-20 flex items-center justify-center 
                 shadow-md z-10 cursor-pointer"
      onClick={onClick}
    >
      <IoIosArrowForward className="text-red-600 lg:text-black text-xl lg:text-3xl" />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-[#91D7E8] lg:bg-white 
                 h-10 w-10 lg:h-24 lg:w-20 flex items-center justify-center 
                 shadow-md z-10 cursor-pointer"
      onClick={onClick}
    >
      <IoIosArrowBack className=" text-red-600 lg:text-black text-xl lg:text-3xl" />
    </div>
  );
};

function Products() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [limit, setLimit] = useState(0);
  const [SerachParams, setSerachParams] = useSearchParams();
  const { CategorySlug } = useParams();
  const [productColor, setProductColor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    if (!isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const {
    toastMsg,
    fetchAllCategory,
    fetchAllColor,
    fetchAllProduct,
    AllCategory,
    AllColor,
    AllProduct,
    API_BASE_URL,
    User_URL,
  } = useContext(MainContext);

  useEffect(() => {
    fetchAllCategory();
    fetchAllColor();
    if (SerachParams.get("limit")) {
      setLimit(SerachParams.get("limit"));
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const query = {};
    if (productColor) {
      query.productColor = productColor;
    }
    if (limit > 0) {
      query.limit = limit;
    }
    setSerachParams(query);
    fetchAllProduct(null, limit, CategorySlug, productColor);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, CategorySlug, productColor]);

  const currentProducts = AllProduct.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(AllProduct.length / itemsPerPage);






  const productGridRef = useRef(null); 

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
  productGridRef.current?.scrollIntoView({ top: 0, behavior: "smooth" });
};

const goToNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage((prev) => prev + 1);
    productGridRef.current?.scrollIntoView({ behavior: "smooth" });
  }
};

const goToPrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage((prev) => prev - 1);
    productGridRef.current?.scrollIntoView({ behavior: "smooth" });
  }
};


  return (
    <div className="bg-white min-h-screen">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={toggleFilter}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Toggle filters"
        >
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Menu bar */}
      <div className="bg-gray-200 text-black mt-2 flex justify-between items-center p-3 px-6 rounded-3xl">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li>
              <Link to="/" className="text-sm font-medium hover:text-[#00BBA7]">
                Home
              </Link>
            </li>
            <li className="inline-flex items-center">
              <HiChevronRight className="w-5 h-5 text-gray-400 mx-1" />
              <Link to="#" className="text-sm font-medium hover:text-[#00BBA7]">
                Pages
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <HiChevronRight className="w-5 h-5 text-gray-400 mx-1" />
                <span className="text-sm font-medium text-gray-400">
                  Product
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="max-w-[1500px] mx-auto mb-3">
        {/* Top Slider and Box img container */}
        <div>
          <h1 className="text-[18px] lg:text-[22px] font-bold px-2 pt-2 ">
            Top Cell Phones
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-3">
            <div className="col-span-1 lg:col-span-5 ">
              <div className="slider-container mt-5 relative focus:border-none">
                <Slider {...settings}>
                  {[
                    "/ProductPageTopSlider1.webp",
                    "/ProductPageTopSlider2.webp",
                    "/ProductPageTopSlider3.webp",
                    "/ProductPageTopSlider4.webp",
                    "/ProductPageTopSlider5.webp",
                    "/ProductPageTopSlider6.webp",
                  ].map((img, index) => (
                    <div key={index} className="w-full">
                      <img
                        src={img}
                        alt=""
                        className="w-full h-[180px] sm:h-[220px] lg:h-[290px] object-cover cursor-pointer rounded-md focus:outline-none"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="hidden lg:block  lg:col-span-2 mt-3 rounded-3xl">
              <div className="p-1 relative">
                <img
                  src="/ProductPageTopSliderRight.webp"
                  alt="Redmi Note"
                  className="w-full h-[220px] lg:h-[300px] object-contain rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
                <div className="flex justify-between p-4 items-center absolute top-5 w-full z-10">
                  <h1 className="text-[14px] lg:text-[20px] font-bold text-white drop-shadow-md leading-tight">
                    TRIGGR Kraken X1 <br />
                    Rise to the challenge
                  </h1>
                  <button className="border-none px-3 py-1 lg:px-4 lg:py-2 bg-black text-white rounded-full text-sm lg:text-base cursor-pointer hover:bg-gray-500 duration-[0.5s]">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular category */}
        <div className="mt-10 mb-10">
          <h2 className="text-[18px] lg:text-[22px] font-bold px-2 mb-4">
            Popular Categories
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2">
            {Array.isArray(AllCategory) &&
              AllCategory.slice(3, 13).map((category, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-xl p-3 flex flex-col items-center hover:bg-gray-200 hover:shadow-lg transition cursor-pointer"
                  >
                    <img
                      src={
                        API_BASE_URL +
                        `/images/Category/` +
                        category.CategoryImageName
                      }
                      alt="Mobiles"
                      className="w-16 h-16 object-contain mb-2"
                    />
                    <h3 className="text-[14px] font-semibold">
                      {category.CategoryName}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {category.productCount}+ items
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

           {/* Best seller in this products */}
        <div>
          <h1 className="text-[18px] lg:text-[22px] font-bold px-2  uppercase">
            Best seller in this products
          </h1>
          <ProductSlider />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-8 lg:pt-10">
          {/* Filter components */}
          <div
            className={`
              fixed inset-0 z-50 lg:relative lg:z-0 lg:col-span-2
              transform transition-transform duration-300 ease-in-out 
              ${isFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
              bg-white lg:bg-transparent
              lg:block
            `}
          >
            <div className="lg:hidden sticky top-0 z-50 bg-white shadow px-4 py-3 flex justify-between items-center border-b">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={toggleFilter} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-60px)] lg:h-auto p-4 space-y-6 ">
              <div className="bg-gray-100 rounded-xl shadow-lg p-4 lg:p-6">
                <h2 className="hidden lg:flex items-center gap-2 text-2xl font-bold text-gray-800 mb-4">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                    <Filter className="h-5 w-5" />
                  </span>
                  Filters
                </h2>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Category
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700">
                      <Link
                        to={"/product"}
                        onClick={() => {
                          setProductColor(null);
                          setLimit(0);
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <ShoppingBag className="h-4 w-4" /> All Category
                        </span>
                      </Link>
                    </div>

                    {Array.isArray(AllCategory) &&
                      AllCategory.map((category, index) => {
                        return (
                          <Link
                            to={`/product/${category.CategorySlug}`}
                            key={index}
                          >
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-300 cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <Smartphone className="h-4 w-4" />{" "}
                                {category.CategoryName}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({category.productCount})
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Color
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Array.isArray(AllColor) &&
                      AllColor.map((color, index) => (
                        <div
                          key={index}
                          onClick={() => setProductColor(color._id)}
                          className="flex items-center justify-between p-2 rounded-lg border hover:border-indigo-500 cursor-pointer"
                        >
                          <span className="text-sm text-gray-800">
                            {color.ColorName}
                          </span>
                          <div
                            className="h-5 w-5 rounded-full border"
                            style={{ background: color.ColorPickerName }}
                          ></div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Price
                  </h3>
                  <input
                    type="range"
                    className="w-full accent-indigo-600 mb-3"
                  />
                  <div className="flex items-center gap-2">
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Brand
                  </h3>
                  <div className="mb-3 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search brand..."
                      className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-indigo-600 h-4 w-4"
                        />
                        <span>Apple</span>
                      </div>
                      <span className="text-sm text-gray-500">8</span>
                    </label>
                    <label className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-indigo-600 h-4 w-4"
                        />
                        <span>Samsung</span>
                      </div>
                      <span className="text-sm text-gray-500">6</span>
                    </label>
                    <label className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-indigo-600 h-4 w-4"
                        />
                        <span>Dell</span>
                      </div>
                      <span className="text-sm text-gray-500">4</span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Rating
                  </h3>
                  <div className="flex flex-col gap-2">
                    <label className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="rating"
                          className="form-radio text-indigo-600 h-4 w-4"
                        />
                        <div className="flex items-center text-amber-400">
                          <Star className="h-4 w-4 fill-amber-400" />
                          <Star className="h-4 w-4 fill-amber-400" />
                          <Star className="h-4 w-4 fill-amber-400" />
                          <Star className="h-4 w-4 fill-amber-400" />
                          <Star className="h-4 w-4 fill-amber-400" />
                          <span className="ml-2 text-gray-700">5 stars</span>
                        </div>
                      </div>
                    </label>

                    <label className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="rating"
                          className="form-radio text-indigo-600 h-4 w-4"
                        />
                        <div className="flex items-center text-amber-400">
                          <Star className="h-4 w-4 fill-amber-400" />
                          <Star className="h-4 w-4 fill-amber-400" />
                          <Star className="h-4 w-4 fill-amber-400" />
                          <span className="ml-2 text-gray-700">3+ stars</span>
                        </div>
                      </div>
                    </label>

                    <label className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="rating"
                          className="form-radio text-indigo-600 h-4 w-4"
                        />
                        <div className="flex items-center text-amber-400">
                          <Star className="h-4 w-4 fill-amber-400" />
                          <span className="ml-2 text-gray-700">1+ star</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Memory
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <input
                        type="checkbox"
                        className="form-checkbox text-indigo-600 h-4 w-4"
                      />
                      <span>4GB</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <input
                        type="checkbox"
                        className="form-checkbox text-indigo-600 h-4 w-4"
                      />
                      <span>8GB</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <input
                        type="checkbox"
                        className="form-checkbox text-indigo-600 h-4 w-4"
                      />
                      <span>16GB</span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Condition
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <input
                        type="checkbox"
                        className="form-checkbox text-indigo-600 h-4 w-4"
                      />
                      <span>New</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <input
                        type="checkbox"
                        className="form-checkbox text-indigo-600 h-4 w-4"
                      />
                      <span>Refurbished</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <input
                        type="checkbox"
                        className="form-checkbox text-indigo-600 h-4 w-4"
                      />
                      <span>Used</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 lg:hidden">
                  <button className="w-1/2 py-2 bg-gray-200 rounded-lg font-medium">
          Clear All
        </button>
        <button
          className="w-1/2 py-2 bg-indigo-600 text-white rounded-lg font-medium"
          onClick={toggleFilter}
        >
          Apply Filters
        </button>
                </div>

                
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 mt-8 bg-white rounded-2xl shadow-sm border border-gray-200">
                <span className="text-gray-500 text-sm font-medium">
                  {AllProduct.length > 0
                    ? `${(currentPage - 1) * itemsPerPage + 1} - ${
                        Math.min(currentPage * itemsPerPage, AllProduct.length)
                      } of ${AllProduct.length} results`
                    : "No results found"}
                </span>

                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">Show</span>
                  <div className="relative">
                    <select
                      onChange={(e) => setLimit(e.target.value)}
                      className="appearance-none px-3 py-2 pr-8 bg-gray-100 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="0">All</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="40">40</option>
                    </select>
                    <IoIosArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">Sort</span>
                  <div className="relative">
                    <select className="appearance-none px-3 py-2 pr-8 bg-gray-100 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                      <option>Default</option>
                      <option>Newest</option>
                      <option>Oldest</option>
                    </select>
                    <IoIosArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                  <span className="text-sm hover:text-black transition">
                    View as
                  </span>
                  <FaThLarge className="hover:text-blue-500 transition" />
                  <FaList className="hover:text-blue-500 transition" />
                </div>
              </div>

           <div
  ref={productGridRef}
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
>
  {Array.isArray(currentProducts) &&
    currentProducts.map((product, index) => (
      <ProductCard
        key={index}
        index={index}
        product={product}
        API_BASE_URL={API_BASE_URL}
        toastMsg={toastMsg}
        User_URL={User_URL}
      />
    ))}
</div>

            </div>
          </div>
        </div>
        
        {/* Improved Pagination */}
        {totalPages > 0 && (
          <div className="flex justify-center items-center  mb-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
  <button
    key={i}
    onClick={() => handlePageChange(i + 1)}
    className={`px-4 py-2 mx-1 rounded-lg ${
      currentPage === i + 1
        ? "bg-indigo-600 text-white"
        : "bg-gray-200 hover:bg-gray-300"
    }`}
  >
    {i + 1}
  </button>
))}

            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Overlay background */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleFilter}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}

export default Products;

function ProductCard({ product,  API_BASE_URL, toastMsg, User_URL }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const handlerAddToCart = (data) => {
    dispatch(addToCart(data));
    if (user) {
      axios
        .post(API_BASE_URL + User_URL + "/addToCart", {
          user_id: user._id,
          product_id: product._id,
        })
        .then((res) => {
          if (res.data.status == 1) {
            toastMsg("Item added to cart", "success");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm flex flex-col">
      <Link to={`/single-Product/${product._id}`} className="cursor-pointer">
        <div className="relative h-44 sm:h-48 w-full">
          <img
            src={`${API_BASE_URL}/images/products/${product.main_image}`}
            alt={product.name}
            className="w-full h-full object-contain"
          />
          <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
            {product.discount_percentage}% OFF
          </span>
        </div>

        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1 leading-tight">
            {product.short_description}
          </h3>
          <div className="text-yellow-400 text-xs">
            ⭐⭐⭐⭐☆ <span className="text-gray-500">(150)</span>
          </div>
        </div>
      </Link>

      <div className="px-3 pb-3">
        <div className="text-green-700 font-bold text-base mb-1">
          {formatPriceINR(product.final_price)}
        </div>
        <div className="text-red-700 line-through text-xs mb-2">
          {formatPriceINR(product.original_price)}
        </div>
        <div className="text-xs text-gray-700 mb-1 flex items-center gap-1">
          <Truck size={12} className="text-green-600" /> Free Shipping
        </div>
        <div
          className={`text-xs font-medium ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          } flex items-center gap-1 mb-3`}
        >
          <CheckCircle size={12} />
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </div>
        <button
          disabled={product.stock <= 0}
          onClick={() =>
            handlerAddToCart({
              productId: product._id,
              original_price: product.original_price,
              final_price: product.final_price,
            })
          }
          className={`w-full py-2 text-sm rounded-xl transition-all font-semibold ${
            product.stock > 0
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-400 text-white cursor-not-allowed opacity-50"
          }`}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
        {product.stock <= 0 && (
          <p className="text-red-500 text-xs mt-2 text-center font-medium">
            This product is currently out of stock.
          </p>
        )}
      </div>
    </div>
  );
}