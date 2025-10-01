import  { useContext, useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShoppingBag } from 'lucide-react';
import { MainContext } from '../../Context/Context'; 

function SliderSection() {
  const { API_BASE_URL,fetchAllCategory, AllCategory } = useContext(MainContext);
  const [loading, setLoading] = useState(true);

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
    fade: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false
        }
      }
    ]
  };

  const bannerImages = [
    {
      url: "/HeaderImage1.webp",
      alt: "Latest Smartphones",
      title: "New iPhone Collection 2025",
      description: "Experience the future with our latest premium smartphones. Limited time offers available.",
      buttonText: "Shop Now",
      badge: "New Arrival"
    },
    {
      url: "/HeaderImage3.webp",
      alt: "Modern Laptops",
      title: "Summer Tech Essentials",
      description: "Upgrade your tech game with our premium collection. Up to 40% off this week only.",
      buttonText: "Explore Collection"
    },
    {
      url: "HeaderImage2.webp",
      alt: "Tech Accessories",
      title: "Premium Accessories",
      description: "Enhance your device experience with our premium accessories. Buy one get one free.",
      buttonText: "View Deals",
      badge: "Limited Offer"
    }
  ];

  return (
    <div className='max-w-[1500px] mx-auto py-3 p-2 bg-white'>
      <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-5 p-2">
       <div className="lg:col-span-2 bg-white px-4 py-3 rounded-2xl max-h-[530px] flex flex-col shadow-md border border-gray-200">
  <div className="pb-4">
    <h1 className="text-2xl sm:text-3xl">
      <span className="border-b-4 border-blue-400 p-1">Category</span>
    </h1>
  </div>

  <div className="overflow-y-auto pr-2" style={{ maxHeight: "440px" }}>
    {loading ? (
      <p>Loading categories...</p>
    ) : (
      AllCategory && AllCategory.length > 0 ? (
        AllCategory.map((cat, index) => (
          <div key={index} className="pb-3 px-4">
            <div 
              className="group cursor-pointer relative border-b border-gray-300 rounded-none p-3 flex items-center gap-3 hover:bg-gray-100 transition duration-200"
            >
              <img
                className="w-10 h-10 rounded-full"
                src={`${API_BASE_URL}/images/category/${cat.CategoryImageName}`}
                alt={cat.CategoryName}
              />
              <span className="font-bold text-gray-800">{cat.CategoryName}</span>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow">
                {cat.productCount}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No categories found.</p>
      )
    )}
  </div>
</div>

        <div className="lg:col-span-4 rounded-2xl overflow-hidden">
          <div className="max-h-[640px] p-3 rounded-2xl">
            <Slider {...settings}>
              {bannerImages.map((banner, index) => (
                <div key={index} className="relative">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={banner.url}
                      alt={banner.alt}
                      className="w-full h-[500px] object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center p-8 md:p-12">
                      <div className="max-w-lg animate-fade-in">
                        {banner.badge && (
                          <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-indigo-600 text-white">
                            {banner.badge}
                          </span>
                        )}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white leading-tight">
                          {banner.title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-md">
                          {banner.description}
                        </p>
                        <button className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium  cursor-pointer">
                          <ShoppingBag size={20} />
                          <span>{banner.buttonText}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SliderSection;

