
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronRight,HiTrash  } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { formatPriceINR } from "../../helper";
import { MainContext } from "../../Context/Context";
import axios from "axios";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { removeTOCart } from "../../Redux/reducer/CartSlice";
formatPriceINR

const Checkout = () => {
  const { error, isLoading, Razorpay } = useRazorpay(); 
  const { toastMsg,AllProduct, fetchAllProduct, API_BASE_URL, User_URL } = useContext(MainContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const user = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart);
  const navigate=useNavigate()
  const dispatch=useDispatch()



  const PaymentModes = ["Cash on Delivery (COD)", "Online Payment"];

  const orderPlace=()=>{

    if (selectedAddress === null && addresses.length > 0) {
    setSelectedAddress(0);
    toastMsg("Default address selected. Please click place order again.", 0);
    return;
  }

     if (selectedAddress === null) {
    toastMsg("Please select a delivery address before placing the order.", 0);
    return;
  }

  if (selectedPayment === null) {
    toastMsg("Please select a payment method before placing the order.", 0);
    return;
  }


  if (selectedPayment === 1 && cart?.totalFinalPrice > 40000) {
    toastMsg("Online payments are limited to ₹40,000. Please choose Cash on Delivery (COD).", 0);
    return;
  }


  const shippingDetails = addresses[selectedAddress];

    axios.post(API_BASE_URL+"/order/order-place/",
    {
       user_id:user._id,
       order_total:cart?.totalFinalPrice,
       payment_mode:selectedPayment,
       shipping_details:shippingDetails
    }
  ).then(
    (success)=>{
      
       if (success.data.status === 1) {
        if(selectedPayment==0){
          navigate(`/thankyou/${success.data.order_id}`)
           dispatch(removeTOCart());

          toastMsg(success.data.msg,success.data.status);

        }else{
          handlePayment(success.data.razorpay_order.order_id,success.data.razorpay_order.razorpay_order);
        }
      } 
    }
  ).catch(
    (error)=>{

      console.log(error);
    }
  )
  }




  const handlePayment = async (order_id,razorpay_order_id) => {

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    currency: "INR",
    name: "ByteBazaar",
    description: "One-stop shop for latest electronics and gadgets",
    image: "/PaymentLogos/ByteBazarLogo.png",
    order_id: razorpay_order_id, 
    handler: async function (response) {
   

      try {
       const res = await axios.post(API_BASE_URL+"/order/payment-success", {
            order_id,
            razorpay_response: response,
            user_id: user?._id
            });
         
             toastMsg(res.data.msg,res.data.status);

              if (res.data.status === 1) {
     
      navigate(`/order-success/${res.data.order_id}`);


    } else {
      console.log("Payment verification failed.");
      // toastMsg.error("Payment verification failed.");
    }

            } catch (error) {
            console.error("Payment Success API Error:", error);
            }
            
            
          
       },

    prefill: {
      name: user?.name,
      email: user?.email,
      contact: user?.contact,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    // alert(response.error.code);
    // alert(response.error.description);
    // alert(response.error.source);
    // alert(response.error.step);
    // alert(response.error.reason);
    // alert(response.error.metadata.order_id);
    // alert(response.error.metadata.payment_id);


  const errorMsg = response.error?.description || "Payment failed. Please try again or use COD.";
  toastMsg(`Payment failed: ${errorMsg}`, 0);

  });

  rzp1.open();
};



const handleDeleteAddress = async (index) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}${User_URL}/delete-address/${user._id}/${index}`);
    if (res.data.status === 1) {
      setAddresses(res.data.addresses); 
      toastMsg("Address deleted successfully!", 1);
    } else {
      toastMsg(res.data.msg || "Failed to delete address", 0);
    }
  } catch (err) {
    console.error("Failed to delete address", err);
    toastMsg("Something went wrong while deleting the address", 0);
  }
};


  useEffect(() => {
    fetchAllProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}${User_URL}/get-addresses/${user._id}`);
      
      if (res.data.status === 1) {
        setAddresses(res.data.addresses);
      } else {
        toastMsg(res.data.msg || "Failed to load addresses", 0);
      }

    } catch (err) {
      console.error("Failed to fetch addresses", err);
      toastMsg("An error occurred while fetching addresses", 0);
    }
  };

  if (user?._id) fetchAddresses();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [user]);

  return (
    <>
      <div className="text-black bg-gray-200 mt-2 flex justify-between items-center p-3 px-6 rounded-3xl">
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
                <span className="text-sm font-medium text-gray-400">
                  Checkout
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

    
      <div className="w-full mx-auto p-4 bg-gray-50">
        <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 text-center">
          CHECKOUT
        </h2>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        
          <div className="w-full lg:w-1/2 space-y-4 lg:space-y-6">
         
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-gray-300">
              <div className="flex flex-row justify-between items-center mb-4 gap-2">
                <h3 className="text-lg lg:text-xl font-semibold">
                  Select Address
                </h3>
                <Link to="/checkout/addAddress">
                  <button className="px-3 py-2 bg-teal-500 text-white text-sm rounded hover:bg-teal-600 cursor-pointer whitespace-nowrap">
                    + Add New Address
                  </button>
                </Link>
              </div>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
{addresses.length === 0 ? (
  <p className="text-sm text-gray-500">No saved addresses. Please add one.</p>
) : (
  addresses.map((address, index) => (
    <div
      key={index}
      onClick={() => setSelectedAddress(index)}
      className={`relative cursor-pointer p-3 border ${
        selectedAddress === index
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-white"
      } rounded-md text-sm`}
    >
    
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent selecting address on delete
          handleDeleteAddress(index);
        }}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
        title="Delete Address"
      >
        <HiTrash size={18} />
      </button>

      <p>{address.addressLine1}</p>
      <p>{address.addressLine2}</p>
      <p>
        {address.city}, {address.state}, {address.postalCode}
      </p>
      <p>{address.country}</p>
    </div>
  ))
)}

              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-gray-300">
              <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
              <div className="flex flex-col gap-3">
                {PaymentModes.map((payment, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPayment(index)}
                    className={`w-full py-3 text-center cursor-pointer rounded-lg font-medium border ${
                      selectedPayment === index
                        ? "bg-teal-500 text-white  "
                        : "bg-gray-50 text-gray-700"
                    } 
                     border-blue-500`}
                  >
                    {payment}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 space-y-4 lg:space-y-6">
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-gray-300">
              <h3 className="text-lg font-semibold mb-3">Your Order</h3>

              {cart?.data?.map((cartItem, cartIndex) => {
                const product = AllProduct?.find(
                  (p) => p._id === cartItem.productId
                );

                if (!product) return null;

                return (
                  <Link
                    to={`/single-Product/${product._id}`}
                    key={cartIndex}
                    className="block hover:no-underline"
                  >
                    <div className="flex flex-row gap-3 bg-white p-3 rounded-lg text-sm border border-gray-200 mb-2 hover:border-blue-500  transition-all relative">
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold z-10">
                        {product.discount_percentage}% OFF
                      </span>

                      <img
                        src={`${API_BASE_URL}/images/products/${product.main_image}`}
                        alt={product.name}
                        className="w-24 h-24 object-contain rounded border border-blue-500"
                      />

                      {/* Product Details */}
                      <div className="flex flex-col justify-center">
                        <h2 className="font-bold text-gray-800">
                          Name: {product.name}
                        </h2>
                        <p className="text-sm  font-bold">
                          Price:{" "}
                          <span className="text-green-600 font-semibold">
                            {formatPriceINR(product.final_price)}
                          </span>{" "}
                          {product.original_price > product.final_price && (
                            <span className="text-gray-400 line-through ml-2 text-sm">
                              {formatPriceINR(product.original_price)}
                            </span>
                          )}
                        </p>
                        <p className="text-sm  font-bold">
                          Qty: {cartItem.qty}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Shipping Summary */}
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-gray-300">
              <h3 className="text-lg font-semibold mb-3">Shipping To</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {user?.name}
                </p>

                {selectedAddress !== null && addresses[selectedAddress] && (
                  <p>
                    <strong>Address:</strong>{" "}
                    {addresses[selectedAddress].addressLine1},{" "}
                    {addresses[selectedAddress].addressLine2},{" "}
                    {addresses[selectedAddress].city},{" "}
                    {addresses[selectedAddress].state},{" "}
                    {addresses[selectedAddress].postalCode},{" "}
                    {addresses[selectedAddress].country}
                  </p>
                )}

                <p>
                  <strong>Contact:</strong> {user?.contact || "9950940637"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub total</span>
                  <span className="font-medium">
                    {formatPriceINR(cart?.totalOriginalPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-red-500">
                    -{formatPriceINR(
                      (cart?.totalOriginalPrice - cart?.totalFinalPrice)
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-300">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-emerald-600">
                    {formatPriceINR(Math.round(cart?.totalFinalPrice))}
                  </span>
                </div>
              </div>
            </div>

           
            <button onClick={orderPlace} className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg font-semibold shadow cursor-pointer hover:bg-teal-600 transition">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
