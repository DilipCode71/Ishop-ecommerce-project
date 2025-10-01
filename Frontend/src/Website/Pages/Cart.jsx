/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { HiChevronRight, HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../../Context/Context";
import { useEffect } from "react";
import {
  removeSingleItemFromCart,
  removeTOCart,
  updateQty,
} from "../../Redux/reducer/CartSlice";
import { formatPriceINR } from "../../helper";
import axios from "axios";

export default function Cart() {
  const { fetchAllProduct, AllProduct, API_BASE_URL,User_URL, toastMsg } =useContext(MainContext);
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const verifyLogin = () => {

    if (cartData?.data.length === 0) {
     toastMsg("Your cart is empty. Please add items before proceeding to checkout.",0);
     return;
    }

    if (user) {
      navigate("/checkout");
    } else {
      navigate("/login?ref=cart");
    }
  };



 const handleQtyChange = async (cartItem, availableCartData, operation) => {
  const updatedQty = operation === "increase" ? cartItem.qty + 1 : cartItem.qty - 1;

  if (updatedQty <= 0) return;

  dispatch(updateQty({
    productId: cartItem.productId,
    qty: updatedQty,
    original_price: availableCartData.original_price,
    final_price: availableCartData.final_price
  }));

  if (user) {
    try {
      const response = await axios.post(`${API_BASE_URL}${User_URL}/update-cart-qty`, {
        userId: user._id,
        productId: cartItem.productId,
        qty: updatedQty
      });

    
    } catch (error) {
      console.error(error);
      toastMsg("Server error while updating cart", 0);
    }
  }
};


  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="text-black bg-gray-50 min-h-screen py-2 lg:py-6">
      <div className="bg-gray-200 lg:mt-2 flex justify-between items-center p-2 px-6 rounded-3xl max-w-7xl mx-auto">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm cursor-pointer font-medium hover:text-[#00BBA7]"
              >
                Home
              </Link>
            </li>
            <li className="inline-flex items-center">
              <Link
                to="#"
                className="inline-flex items-center text-sm font-medium cursor-pointer hover:text-[#00BBA7]"
              >
                <HiChevronRight className="w-5 h-5 text-gray-400 mx-1" />
                Pages
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <HiChevronRight className="w-5 h-5 text-gray-400 mx-1" />
                <span className="text-sm font-medium text-gray-400">Cart</span>
              </div>
            </li>
          </ol>
        </nav>
        <button
          onClick={async () => {
            dispatch(removeTOCart()); 

            if (user) {
              const response = await fetch(
                `${API_BASE_URL}${User_URL}/clear-cart/${user._id}`,
                {
                  method: "POST",
                }
              );

              const result = await response.json();
              if (result.status === 1) {
                toastMsg("Cart cleared successfully", 1);
              } else {
                toastMsg("Failed to clear cart from server", 0);
              }
            }
          }}
          className="cursor-pointer bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Clear Cart All Item
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            {cartData?.data.length === 0 ? (
              <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500 text-lg font-medium">
                🛒 Your cart is empty. <br />{" "}
                <Link to="/product" className="text-[#00BBA7] hover:underline">
                  Continue shopping
                </Link>
              </div>
            ) : (
              cartData?.data.map((cartItem, cartIndex) => {
                const availableCartData = AllProduct.find(
                  (product) => product._id == cartItem.productId
                );
                return (
                  <div
                    key={cartIndex}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-200 w-full"
                  >
                    <div className="flex gap-6">
                      <img
                        src={
                          API_BASE_URL +
                          `/images/products/${availableCartData?.main_image}`
                        }
                        alt="Product"
                        className="w-32 h-32 object-contain rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {availableCartData?.name}
                            </h3>

                            <div className="mb-2">
                              <p className="text-sm text-gray-500">
                                M.R.P. :{" "}
                                <span className="line-through text-red-400">
                                  ₹{formatPriceINR(availableCartData?.original_price)}
                                </span>
                              </p>
                              <p className="text-lg font-bold text-emerald-600">
                                {formatPriceINR(
                                  availableCartData?.final_price * cartItem.qty
                                )}

                                <span className="text-sm text-red-500 font-semibold ml-1">
                                  ({availableCartData?.discount_percentage}%
                                  OFF)
                                </span>
                              </p>
                            </div>

                            <p className="text-green-600 text-sm font-medium mb-3">
                              Eligible for FREE Shipping
                            </p>
                          </div>

                          <button
                            onClick={async () => {
                              dispatch(removeSingleItemFromCart({
                                  productId: availableCartData._id,
                                  original_price: availableCartData?.original_price,
                                  final_price: availableCartData?.final_price
                                })); 

                              if (user) {
                                const response = await fetch(
                                  `${API_BASE_URL}${User_URL}/remove-cart-item`,
                                  {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      userId: user._id,
                                      productId: cartItem.productId,
                                    }),
                                  }
                                );

                                const result = await response.json();
                                if (result.status === 1) {
                                  toastMsg("Item removed from cart", 1);
                                } else {
                                  toastMsg(
                                    "Failed to remove item from server",
                                    0
                                  );
                                }
                              }
                            }}
                            className="text-gray-400 hover:text-red-500 text-xl cursor-pointer"
                          >
                            <HiTrash />
                          </button>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-300 shadow-sm">
                            <button 
                            onClick={() => handleQtyChange(cartItem,availableCartData, "decrease")}
                            className="text-gray-500 hover:text-emerald-600 text-xl cursor-pointer">
                              <HiMinus />
                            </button>
                            <input
                              type="number"
                              value={cartItem.qty}
                              min={1}
                              // defaultValue={cartItem.qty}
                              className="w-12 text-center border-none outline-none bg-transparent text-gray-800 font-medium"
                            />
                            <button
                            
                             onClick={() => handleQtyChange(cartItem, availableCartData,"increase")}
                            className="text-gray-500 cursor-pointer hover:text-emerald-600 text-xl">
                              <HiPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="lg:w-96">
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub total</span>
                  <span className="font-medium">
                    {formatPriceINR(cartData?.totalOriginalPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-red-500">
                    -
                    {formatPriceINR(
                      (
                        cartData?.totalOriginalPrice - cartData?.totalFinalPrice
                      ).toFixed(2)
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-300">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-emerald-600">
                    {formatPriceINR(Math.round(cartData?.totalFinalPrice))}
                  </span>
                </div>
              </div>

              <button
                onClick={verifyLogin}
  //                disabled={cartData?.data.length === 0}
  // className={`w-full mt-6 cursor-pointer py-3 rounded-lg transition-colors
  //   ${cartData?.data.length === 0
  //     ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
  //     : 'bg-emerald-600 text-white hover:bg-emerald-700'}
  // `}
                
                className="w-full mt-6 cursor-pointer bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="mt-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-medium mb-3">Have a Promo Code?</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <button className="px-4 py-2 font-bold bg-gray-200 text-black rounded-lg cursor-pointer hover:bg-red-400">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

