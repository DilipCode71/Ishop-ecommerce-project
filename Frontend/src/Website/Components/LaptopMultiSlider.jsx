import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MainContext } from "../../Context/Context";
import { formatPriceINR } from '../../helper';


function NextArrow(props) {
    const { onClick } = props;
    return (
        <button
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white border rounded-full cursor-pointer shadow p-2 z-20 hover:bg-gray-100"
            onClick={onClick}
        >
            <ArrowRight size={20} />
        </button>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <button
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white border rounded-full cursor-pointer shadow p-2 z-20 hover:bg-gray-100"
            onClick={onClick}
        >
            <ArrowLeft size={20} />
        </button>
    );
}


function LaptopMultiSlider() {
    const { API_BASE_URL, Product_URL } = useContext(MainContext);
    const [product, SetProduct] = useState([]);

    useEffect(() => {
        axios
            .get(API_BASE_URL + Product_URL)
            .then((response) => {
                if (response.data.status === 1) {
                    SetProduct(response.data.product);
                }
            })
            .catch(() => {
                SetProduct([]);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
         <div className="slider-container relative px-6 py-5">
            <Slider {...settings}>
                {product?.length > 0 ? (
                    product
                        .filter((item) => item.category_id._id === "682f1475db809fe29fd898da")
                        .map((item, index) => (
                            <Link to={`/single-Product/${item._id}`} key={index}>
                                <div
                                    key={index}
                                    className=" p-4 rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out mx-2 flex flex-col gap-3">
                                    {item.discount_percentage && (
                                        <div className="bg-green-500 text-white px-2 py-1 text-xs rounded-full w-max">
                                            SAVE {item.discount_percentage}%
                                        </div>
                                    )}
                                    <img
                                        src={`${API_BASE_URL}/images/products/${item.main_image}`}
                                        alt={item.name}
                                        className="w-full h-[150px] object-contain"
                                    />
                                    <h3 className="text-sm font-semibold line-clamp-2">{item.short_description}</h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-green-500 text-lg font-bold">{formatPriceINR(item.final_price)}</p>
                                        {item.original_price && (
                                            <p className="text-red-500 text-sm line-through">{formatPriceINR(item.original_price)}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-green-600 text-xs">Free Shipping</p>
                                        <p className="text-gray-600 text-xs">In Stock</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                ) : (
                    <p className="text-center text-gray-500">No products available</p>
                )}
            </Slider>
        </div>
    );
}

export default LaptopMultiSlider;