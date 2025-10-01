import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MainContext } from "../../Context/Context";
import { useDispatch } from "react-redux";
import { removeTOCart } from "../../Redux/reducer/CartSlice";
import { motion } from "framer-motion";

function OrderSuccess() {
  const { id } = useParams();
  const { API_BASE_URL } = useContext(MainContext);
  const [orderData, setOrderData] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    axios.get(API_BASE_URL+`/order/get-orders/${id}`)
    .then(
      (res)=>{
        setOrderData(res.data.Orders);
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    )
    dispatch(removeTOCart());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!orderData) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-48"></div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Order Confirmed!
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Your order <span className="font-medium text-green-600">#{orderData._id}</span> has been placed successfully.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Track Order
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden mb-8"
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-2 sm:mt-0">
                Paid
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
                <div className="space-y-2 text-gray-600">
                  <p>{orderData.shipping_details.addressLine1}</p>
                  <p>{orderData.shipping_details.addressLine2}</p>
                  <p>{orderData.shipping_details.city}, {orderData.shipping_details.state} {orderData.shipping_details.postalCode}</p>
                  <p>{orderData.shipping_details.country}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Payment Information</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Payment Method: {orderData.razorpay_payment_id ? "Online Payment" : "Cash on Delivery"}</p>
                  <p>Payment ID: {orderData.razorpay_payment_id || "N/A"}</p>
                  <p>Order Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
            <div className="divide-y divide-gray-200">
              {orderData.product_details.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="py-4 flex flex-col sm:flex-row"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={item?.product_id?.main_image 
                        ? `${API_BASE_URL}/images/products/${item?.product_id?.main_image}`
                        : "/default-image.png"}
                      alt={item?.product_id?.title || "Product Image"}
                      className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{item.product_id.title}</h4>
                        <p className="mt-1 text-sm text-gray-500">Quantity: {item.qty}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-right">
                        <p className="text-lg font-medium text-gray-900">₹{item.total}</p>
                        <p className="text-sm text-gray-500">₹{item.price} each</p>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-3">
                      <button className="text-sm font-medium text-green-600 hover:text-green-500">
                        Buy again
                      </button>
                      <button className="text-sm font-medium text-gray-600 hover:text-gray-500">
                        View product
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 sm:px-8">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Need help with your order?</p>
              <button className="text-sm font-medium text-green-600 hover:text-green-500">
                Contact support
              </button>
            </div>
          </div>
        </motion.div>

       

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-500 mb-4">Thank you for shopping with us!</p>
          <Link to={"/"}>
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer">
            Continue Shopping
            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </button>
          </Link>

        </motion.div>
      </div>
    </motion.div>
  );
}

export default OrderSuccess;