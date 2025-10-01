import { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MainContext } from "../../Context/Context";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { formatPriceINR } from "../../helper";

import { Link } from "react-router-dom";


const sliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 5, 
  slidesToScroll: 3,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 4 } },  
    { breakpoint: 1024, settings: { slidesToShow: 3 } },  
    { breakpoint: 768, settings: { slidesToShow: 2} }, 
    { breakpoint: 480, settings: { slidesToShow:1,
        slidesToScroll: 1, } },   
  ],
};

const ProductSlider = () => {
  const [product, setProducts] = useState([]);
  const { API_BASE_URL, Product_URL } = useContext(MainContext);

  const fetchProduct = () => {
    axios
      .get(API_BASE_URL + Product_URL)
      .then((response) => {
        setProducts(response.data.product); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProduct(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="slider-container px-4 py-8 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 ">Popular Products</h2>

      {Array.isArray(product) && product.length > 0 && (
        <Slider {...sliderSettings}>
          {product.slice(5, 20).map((product, index) => (


<div key={index}>
  <div className="bg-white rounded-2xl shadow-md overflow-hidden mx-2 mb-4 h-[420px] sm:h-[460px] flex flex-col justify-between">
   

   <Link to={`/single-product/${product._id}`}>
   
    <div className="relative h-[220px] sm:h-[260px] w-full">
      <img
        src={`${API_BASE_URL}/images/products/${product.main_image}`}
        alt={product.name}
        loading="lazy"
        className="w-full h-full object-contain cursor-pointer"
      />
      <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
        {product.discount_percentage}% OFF
      </div>
    </div>

   </Link>


    <div className="p-3 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-[14px] font-semibold text-gray-800 line-clamp-1 leading-snug h-[38px]">
          {product.name}
        </h2>
        <p className="text-[12px] text-gray-600 line-clamp-2 h-[34px] mb-1">
          {product.short_description}
        </p>

        <div className="text-yellow-400 text-xs mb-1">
          ⭐⭐⭐⭐☆ <span className="text-gray-500">(128)</span>
        </div>

        <div className="text-[15px] font-bold text-green-700 mb-1">
          {formatPriceINR(product.final_price)}
        </div>

        <div className="text-[12px] text-red-400 line-through mb-1">
          {formatPriceINR(product.original_price)}
        </div>

        <div className="flex items-center justify-between text-[12px] font-medium mt-1">
          <span className="text-blue-600">Free Shipping</span>
          <span className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
            <CheckCircle size={12} className="inline-block mr-1" />
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductSlider;
