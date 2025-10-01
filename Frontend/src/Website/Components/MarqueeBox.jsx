import React, { useContext, useEffect, useState } from 'react';
import Slider from "react-slick";
import Marquee from "react-fast-marquee";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MainContext } from '../../Context/Context';

function MarqueeBox() {
  const { API_BASE_URL, fetchAllCategory, AllCategory } = useContext(MainContext);
  const [loading, setLoading] = useState(true);
  let sliderRef = React.useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllCategory();
      setLoading(false);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 900,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const featuredBrands = [
    { name: "JANX", img: "/brandlogo1.png" },
    { name: "Digitek", img: "/brandlogo2.png" },
    { name: "Tek React JS", img: "/brandlogo3.png" },
    { name: "Grafbase", img: "/brandlogo4.png" },
    { name: "MSI", img: "/brandlogo5.png" },
    { name: "Ohbear", img: "/brandlogo6.png" },
    { name: "OAK", img: "/brandlogo7.png" },
    { name: "Snyk", img: "/brandlogo8.png" },
    { name: "Sonex", img: "/brandlogo9.png" },
    { name: "Stropi", img: "/brandlogo10.png" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg bg-gradient-to-br from-teal-50 to-white shadow-lg">
      {/* Featured Brands */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">FEATURED BRANDS</h2>
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline hover:scale-105 transition-transform duration-200"
          >
            View All
          </a>
        </div>
        <div className="space-y-4">
          <Marquee direction="left" speed={50} gradient={false} pauseOnHover={true}>
            <div className="flex items-center gap-8">
              {featuredBrands.map((brand, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-gray-700 font-medium"
                >
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain mb-1 cursor-pointer transition-transform duration-200 hover:scale-110 hover:shadow-lg"
                  />
                </div>
              ))}
            </div>
          </Marquee>

          <Marquee direction="right" speed={50} gradient={false} pauseOnHover={true}>
            <div className="flex items-center gap-8">
              {featuredBrands.map((brand, index) => (
                <div
                  key={index + 100}
                  className="flex flex-col items-center text-gray-700 font-medium"
                >
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain mb-1 cursor-pointer transition-transform duration-200 hover:scale-110 hover:shadow-lg"
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white p-4 sm:p-4 rounded-lg shadow-md relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">TOP CATEGORIES</h2>
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline hover:scale-105 transition-transform duration-200"
          >
            View All
          </a>
        </div>

        {loading ? (
          <p className="text-center py-4">Loading categories...</p>
        ) : AllCategory && AllCategory.length > 0 ? (
          <>
            <Slider ref={sliderRef} {...settings} className="overflow-hidden">
              {AllCategory.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-full text-center py-4 cursor-pointer"
                >
                  <img
                    src={`${API_BASE_URL}/images/category/${item.CategoryImageName}`}
                    alt={item.CategoryName}
                    className="w-10 h-10 sm:w-20 sm:h-20 object-fill mx-auto rounded-full"
                  />
                  <span className="text-gray-700 font-medium mt-2 text-xs sm:text-sm mx-auto">
                    {item.CategoryName}
                  </span>
                </div>
              ))}
            </Slider>

            <button
              className="absolute top-1/2 left-2 sm:left-3 transform -translate-y-1/2 bg-gray-200 cursor-pointer p-1.5 sm:p-2 rounded-full shadow-md z-10"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <FaChevronLeft className="text-gray-700 text-sm sm:text-base" />
            </button>
            <button
              className="absolute top-1/2 right-2 sm:right-3 transform -translate-y-1/2 bg-gray-200 cursor-pointer p-1.5 sm:p-2 rounded-full shadow-md z-10"
              onClick={() => sliderRef.current.slickNext()}
            >
              <FaChevronRight className="text-gray-700 text-sm sm:text-base" />
            </button>
          </>
        ) : (
          <p className="text-center py-4">No categories found.</p>
        )}
      </div>
    </div>
  );
}

export default MarqueeBox;
