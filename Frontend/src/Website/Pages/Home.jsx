import React, { useContext, useEffect, useRef, useState } from 'react';
import SliderSection from '../Components/SliderSection';
import MarqueeBox from '../Components/MarqueeBox';
import { MainContext } from '../../Context/Context';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { formatPriceINR } from '../../helper';
import { FiCheck, FiShoppingCart,FiTruck  } from 'react-icons/fi';
import { FaPlay } from 'react-icons/fa';
import PhoneMultiSlider from "../Components/PhoneMultiSlider"
import LaptopMultiSlider from '../Components/LaptopMultiSlider';
import CustomVideoPlayer from '../Components/CustomVideoPlayer';
import axios from 'axios';
import { addToCart } from '../../Redux/reducer/CartSlice';




function Home() {
  const { API_BASE_URL, fetchAllCategory, fetchAllProduct, AllProduct ,User_URL ,toastMsg} = useContext(MainContext);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

   const [activeTab, setActiveTab] = useState("Best Seller");


  useEffect(() => {
    fetchAllCategory();
    fetchAllProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ProductId = "683d3705bfe9ec2b6f7a7fe4";
  const selectedProduct = AllProduct.find((product) => product._id === ProductId);

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.main_image || selectedProduct.other_image?.[0]);
    }
  }, [selectedProduct]);

  const targetDate = new Date("2026-04-12T23:59:59");
  
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

    const categoryMap = {
        "Best Seller":"683d3f05bfe9ec2b6f7a83ca",
        "New In": "6832bee17154dffe62928803",
        "Popular": "6832c2a07154dffe62928833",
    };



    const filteredProducts = AllProduct.filter((item) => {
   return  item.category_id._id === categoryMap[activeTab];
    } )
               
 const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.controls = true; 
      videoRef.current.play();
      setIsPlaying(true); 
    }
  };



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
    <>
      <SliderSection />
      <MarqueeBox />

 <div className="bg-white shadow p-4 md:p-6 rounded-lg grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
      <div className="lg:col-span-3 flex flex-col">
        <h2 className="text-xl p-4 md:p-5 rounded-2xl text-white font-bold mb-4 bg-[#01A49E]">
          DEALS OF THE DAY
        </h2>

        <div className="w-full bg-white p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 shadow rounded-xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 overflow-x-auto sm:overflow-visible">
              {selectedProduct?.other_image?.map((img, index) => (
                <img
                  key={index}
                  src={`${API_BASE_URL}/images/products/${img}`}
                  alt={`Thumb ${index + 1}`}
                  className="w-16 h-16 object-contain rounded cursor-pointer border border-gray-200 hover:ring-2 hover:ring-teal-500"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>

            <div className="relative flex-grow">
              <img
                src={`${API_BASE_URL}/images/products/${mainImage}`}
                alt="Main Product"
                className="object-contain rounded w-full max-h-52 md:max-h-72 lg:max-h-96"
              />
              <div className="absolute top-2 left-2 bg-teal-500 text-white px-3 py-1 text-sm font-semibold rounded">
                Save {selectedProduct?.discount_percentage}%
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link to={`/single-Product/${selectedProduct?._id}`}>
              <h2 className="text-xl md:text-2xl font-semibold line-clamp-2 hover:underline hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                {selectedProduct?.short_description}
              </h2>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl text-teal-600 font-bold">
                {formatPriceINR(selectedProduct?.final_price)}
              </span>
              <span className="line-through text-red-400 text-lg">
                {formatPriceINR(selectedProduct?.original_price)}
              </span>
            </div>

            <p className="font-semibold text-sm text-gray-700 mt-1 mb-1">
              Product Description:
            </p>

            <div className="text-black overflow-auto max-h-48">
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedProduct?.long_description,
                }}
              />
            </div>

            <div className="flex gap-2 flex-wrap mt-2">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 text-xs rounded">
                FREE SHIPPING
              </span>
              <span className="bg-teal-100 text-teal-700 px-3 py-1 text-xs rounded">
                FREE GIFT
              </span>
            </div>

            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                HURRY UP! PROMOTION WILL EXPIRE IN
              </p>
              <div className="flex gap-4 text-center flex-wrap">
                {timeUnits.map(({ label, value }) => (
                  <div
                    key={label}
                    className="relative bg-gradient-to-br from-teal-400 to-teal-600 text-white px-4 py-2 rounded-xl shadow-md w-16 h-16 overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={value}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl font-bold"
                      >
                        {value.toString().padStart(2, "0")}
                      </motion.div>
                    </AnimatePresence>
                    <p className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-white opacity-80">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full mt-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Sold: 26/75</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500" style={{ width: "34.6%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 flex flex-col gap-5 justify-end">
        {["Deal1.png", "Noise.png", "Noise.png", "Deal1.png"].map((src, i) => (
          <img
            key={i}
            src={`/${src}`}
            alt={`Banner ${i + 1}`}
            className="bg-white shadow rounded-xl w-full h-32 md:h-40 object-contain"
          />
        ))}
      </div>
    </div>


   <div className="my-4 w-full max-w-screen-xxl mx-auto  overflow-hidden bg-gradient-to-r from-teal-500  via-teal-400 to-teal-600 flex flex-col lg:flex-row items-center justify-between p-4 text-white shadow rounded-xl bg-white  ">

  <div className="text-left space-y-2 w-full lg:w-1/4 mb-6 lg:mb-0">
    <h3 className="text-lg font-semibold flex items-center gap-2">
      <span>PRE ORDER</span>
      <span className="bg-white text-teal-600 text-xs px-2 py-0.5 rounded-full font-bold">NEW</span>
    </h3>
    <p className="text-sm uppercase tracking-wider">Be the first to own</p>
    <p className="text-base font-bold">From $399</p>
    <p className="text-sm font-medium text-yellow-200">Limited offer ends in: 02:15:47</p>
  </div>


  <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-2/4 justify-center mb-6 lg:mb-0">
    <div className="relative p-2 rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-white/5">
      <img
        src="/Noise.png"
        alt="Noise Watch"
        className="h-40 sm:h-44 md:h-40 object-contain transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      />
    </div>

    <div className="text-center sm:text-left">
      <p className="text-sm font-medium leading-tight">
        Noise Pro 6 Smart Watch<br />Series 8
      </p>
      <h2 className="text-xl md:text-2xl font-semibold mt-1">A healthy leap ahead</h2>
      <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.63-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.45 4.73L5.82 21z"/>
          </svg>
        ))}
        <span className="text-sm ml-1">(4.8/5)</span>
      </div>

      <ul className="text-sm text-white space-y-1 mt-2 list-disc list-inside">
        <li>1.8" AMOLED Display</li>
        <li>Heart Rate & SpO2 Monitoring</li>
        <li>7-Day Battery Life</li>
      </ul>
    </div>
  </div>

  <div className="w-full lg:w-1/4 flex justify-center lg:justify-end">
    <button className="bg-white cursor-pointer text-teal-600 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition">
      Discover Now
    </button>
  </div>
    </div>


      <div className="p-4 bg-white shadow rounded-xl my-3 lg:my-5  border border-gray-300 sm:p-6">
                <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 overflow-x-auto">
                    {Object.keys(categoryMap).map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={`text-sm sm:text-base font-semibold cursor-pointer px-3 py-2 rounded-lg uppercase transition ${activeTab === category ? "bg-[#009689] text-white" : "text-gray-500 hover:text-black"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-2 sm:gap-4 sm:px-4">
    {filteredProducts.slice(0, 5).map((product) => (
        <div key={product._id} className="group relative rounded-xl overflow-hidden shadow-sm sm:shadow-xl">
            <div className="bg-white p-2 sm:p-3 border border-gray-100 hover:border-green-200 rounded-xl flex flex-col h-full min-h-[280px] sm:min-h-[340px]">
                {product.discount_percentage && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-green-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center justify-center">
                        {product.discount_percentage}% OFF
                    </span>
                )}
                <Link to={`/single-Product/${product._id}`}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center p-1 sm:p-2">
                        <img
                            src={`${API_BASE_URL}/images/products/${product.main_image}`}
                            alt={product.name}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                    <div className="mt-2 sm:mt-3 flex flex-col flex-grow px-1 sm:px-0">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                            {product.name}
                        </h3>
                        <h3 className="text-xs sm:text-sm text-gray-500 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                            {product.short_description}
                        </h3>

                        <div className="mt-1 sm:mt-2 flex items-center gap-1 sm:gap-2">
                            <p className="text-xs sm:text-base font-bold text-green-700">
                                {formatPriceINR(product.final_price)}
                            </p>
                            {product.original_price && (
                                <p className="text-[10px] sm:text-xs text-red-500 line-through">
                                    {formatPriceINR(product.original_price)}
                                </p>
                            )}
                        </div>

                        <div className="mt-1 sm:mt-2 flex justify-between items-center text-[10px] sm:text-xs">
                            <span className={`inline-flex items-center ${product.stock ? 'text-green-600' : 'text-red-500'}`}>
                                <FiCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                                {product.stock ? 'In Stock' : 'Out of Stock'}
                            </span>
                            <span className="inline-flex items-center text-gray-500">
                                <FiTruck className="mr-0.5 sm:mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                                Free Shipping
                            </span>
                        </div>
                    </div>
                </Link>
                
                <div className="mt-2 sm:mt-3">
                    <button
                     onClick={() =>
            handlerAddToCart({
              productId: product._id,
              original_price: product.original_price,
              final_price: product.final_price,
            })
          }
                        disabled={!product.stock}
                        className={`w-full py-1.5 sm:py-2 text-xs sm:text-sm ${
                            product.stock 
                                ? 'bg-[#00BBA7] hover:bg-[#009982]' 
                                : 'bg-gray-400 cursor-not-allowed'
                        } text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center gap-1 sm:gap-2 cursor-pointer`}
                    >
                        <FiShoppingCart className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                        {product.stock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    ))}
</div>
      </div>


   <div className="p-4 bg-white shadow rounded-xl border border-gray-300 lg:my-5">
    <h2 className="text-xl sm:text-2xl font-bold mb-4">Top Cellphones & Tablets</h2>

    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 p-2 sm:p-4 lg:p-5 rounded-xl">

       
        <div className="relative w-full lg:w-1/2 shadow rounded-xl ">
            <img
                src="\OPPOPad3Tablet .jpg"
                alt="oppo Pad"
                className="w-full h-[350px] rounded-xl object-center cursor-pointer"
            />
           <div className="absolute top-3 sm:top-4 lg:top-5 left-3 sm:left-4 lg:left-5 p-2 sm:p-3 lg:p-4 w-3/4 sm:w-2/3 lg:w-1/2 bg-transparent  rounded-lg">
    <h2 className="text-black text-sm sm:text-lg lg:text-2xl xl:text-3xl font-semibold leading-tight">
        OPPO Pad 3 <br /> Android Tablet
    </h2>
    <p className="text-black mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
        Power meets elegance
    </p>
    <button className="bg-black text-white px-3 py-1 sm:px-4 sm:py-2 mt-1 sm:mt-2 lg:mt-3 rounded cursor-pointer text-xs sm:text-sm">
        SHOP NOW
    </button>
</div>

        </div>

        
        <div className="w-full lg:w-1/2 flex flex-col shadow rounded-xl p-2">
     
            <div className="flex justify-between items-center mb-2 ">
                <h3 className="text-black font-semibold text-lg">Featured Products</h3>
               
                    <span className="text-sm   text-black hover:underline   cursor-pointer">
                        View All Products
                    </span>
                
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3  gap-4 sm:gap-5 p-2  rounded-lg">
                {AllProduct
                    .filter((item) => item.category_id._id === "682f04d90cd08982d3b5a256")
                    .slice(1, 7)
                    .map((item, index) => (
                        <Link to={`/single-Product/${item._id}`} key={index}>
                            <div className="flex flex-col items-center justify-center gap-2 text-black">
                                <img
                                    src={`${API_BASE_URL}/images/products/${item.main_image}`}
                                    alt={item.name}
                                    className="w-[80px] h-[80px] object-contain"
                                />
                                <p className="text-sm text-center">{item.name}</p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    </div>

    <PhoneMultiSlider />
    </div>



  <div className="p-4 sm:px-6 lg:p-4 my-4 bg-white shadow rounded-xl border border-gray-300">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Best Laptops & Computers</h2>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 p-3 sm:p-4 lg:p-5 rounded-xl">

       <div className="relative w-full lg:w-1/2 shadow rounded-xl border border-blue-800 hover:border-blue-400 ">
      <video
        ref={videoRef}
        src="/McProVideo/MacBook Pro Laptop.mp4"
        muted
        poster="/MacBookPro (2).jpg"
        className="rounded-xl w-full lg:h-[360px] object-cover"
        controls={false} 
      />

      {!isPlaying && (
        <button
          onClick={handlePlay}
          aria-label="Play Video"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-gradient-to-r from-blue-600 to-purple-600 
                     text-white p-5 rounded-full 
                     shadow-lg hover:shadow-xl 
                     hover:scale-110 active:scale-95 
                     transition-all duration-300 ease-in-out 
                     cursor-pointer group z-20"
        >
          <FaPlay className="text-2xl group-hover:scale-110 transition-transform duration-200" />
        </button>
      )}
    </div>
      
       <div className="w-full lg:w-1/2 flex flex-col shadow rounded-xl p-2">
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-black font-semibold text-lg">Top Rated Products</h3>
    <span className="text-sm text-black hover:underline cursor-pointer">
      View All Products
    </span>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 sm:gap-5 p-2 rounded-lg">
    {AllProduct
      .filter((item) => item.category_id._id === '682f1475db809fe29fd898da')
      .slice(1, 7)
      .map((item, index) => (
        <Link to={`/single-Product/${item._id}`} key={index}>
          <div className="flex flex-col items-center justify-center gap-2 text-black">
            <img
              src={`${API_BASE_URL}/images/products/${item.main_image}`}
              alt="Product"
              className="w-[80px] h-[80px] object-contain"
            />
            <p className="text-sm text-center">{item.name}</p>
          </div>
        </Link>
      ))}
  </div>
</div>

      </div>

      <LaptopMultiSlider />
    </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 py-3 bg-white shadow rounded-xl border border-gray-300">
      {/* AUDIOS & CAMERAS */}
      <div className="p-4 bg-white shadow rounded-xl ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">AUDIOS & CAMERAS</h2>
          <a href="#" className="text-sm text-gray-500">View All</a>
        </div>
        <CustomVideoPlayer
          src="/McProVideo/Audio&Video.mp4"
          poster="/Audio&Video.jpg"
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          {AllProduct.filter(item => item.category_id._id === "683d3d20bfe9ec2b6f7a8210").map((item, i) => (
            <Link to={`/single-Product/${item._id}`} key={i}>
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-100  w-24 h-24 flex items-center justify-center overflow-hidden">
                  <img
                    src={`${API_BASE_URL}/images/products/${item.main_image}`}
                    alt={item.name}
                    className="object-cover w-full h-full lg:object-contain"
                  />
                </div>
                <p className="mt-2 text-sm font-medium line-clamp-1">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* GAMING Monitor */}
      <div className="p-4 bg-white shadow rounded-xl ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">GAMING Monitor</h2>
          <a href="#" className="text-sm text-gray-500">View All</a>
        </div>
        <CustomVideoPlayer
          src="/McProVideo/Monitor .mp4"
          poster="/Monitor.jpg"
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          {AllProduct.filter(item => item.category_id._id === "683d2bf9bfe9ec2b6f7a7d35").map((item, i) => (
            <Link to={`/single-Product/${item._id}`} key={i}>
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-100  w-24 h-24 flex items-center justify-center overflow-hidden">
                  <img
                    src={`${API_BASE_URL}/images/products/${item.main_image}`}
                    alt={item.name}
                    className="object-cover w-full h-full lg:object-contain"
                  />
                </div>
                <p className="mt-2 text-sm font-medium line-clamp-1">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white shadow rounded-xl ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">OFFICE EQUIPMENTS</h2>
          <a href="#" className="text-sm text-gray-500">View All</a>
        </div>
        <CustomVideoPlayer
          src="/McProVideo/PortablePrinter.mp4"
          poster="/Portable Printer.jpg"
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          {AllProduct.filter(item => item.category_id._id === "683d3dccbfe9ec2b6f7a8314").map((item, i) => (
            <Link to={`/single-Product/${item._id}`} key={i}>
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-100 rounded w-24 h-24 flex items-center justify-center overflow-hidden">
                  <img
                    src={`${API_BASE_URL}/images/products/${item.main_image}`}
                    alt={item.name}
                    className="object-cover w-full h-full  lg:object-contain"
                  />
                </div>
                <p className="mt-2 text-sm font-medium line-clamp-1">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
            
            

<div className="bg-white shadow rounded-xl  my-2 lg:my-4 p-4">
  <div className="flex flex-wrap gap-4">
    <div className="flex flex-1 bg-teal-600 rounded-xl p-6 min-h-[160px] text-white items-center justify-between flex-col sm:flex-row">
      <div className="max-w-full sm:max-w-[60%] mb-4 sm:mb-0">
        <h6 className="uppercase tracking-widest font-semibold text-base mb-2">
          Massage Chair Luxury
        </h6>
        <p className="text-sm mb-4 leading-snug">
          Fuka Relax Full Body<br />
          Massage Chair
        </p>
        <button className="bg-white text-black font-semibold text-sm py-2 px-6 rounded-full cursor-pointer duration-200">
          Shop Now
        </button>
      </div>
      <img
        src="/chaireELECTRONICS.jpg"
        alt="Massage chair"
        className="w-[150px] h-auto sm:ml-4 rounded-lg object-cover"
      />
    </div>

    <div className="flex flex-1 bg-gray-800 rounded-xl p-6 min-h-[160px] text-white items-center justify-between flex-col sm:flex-row">
      <div className="max-w-full sm:max-w-[55%] mb-4 sm:mb-0">
        <h6 className="uppercase tracking-widest font-semibold text-base mb-2">
          Latest Electronics
        </h6>
        <p className="text-sm mb-4 leading-snug">
          Explore Laptops & Smartphones<br />
          Built for Performance
        </p>
        <button className="bg-[#1AA0A3] cursor-pointer text-white font-semibold text-sm py-2 px-6 rounded-full hover:bg-[#00A63E] duration-300 ">
          Explore
        </button>
      </div>
      <div className="flex gap-4 sm:ml-4">
        <img
          src="/Latestlaptop.jpg"
          alt="Laptop"
          className="w-[100px] h-[100px] rounded-lg object-cover"
        />
        <img
          src="/LatestSmartPhone.jpg"
          alt="Smartphone"
          className="w-[100px] h-[100px] rounded-lg object-cover hidden lg:block"
        />
      </div>
    </div>
  </div>
</div>



    </>
  );
}

export default Home;



