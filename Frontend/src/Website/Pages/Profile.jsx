

import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import {  Loader2,  Edit, Check, X } from "lucide-react";
import {
  FaBuilding,
  FaUser,
  FaShippingFast,
  FaClipboardList,
  FaShoppingCart,
} from "react-icons/fa";
import { MdClose, MdKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import Swal from 'sweetalert2';
import { logout, updateContact } from "../../Redux/reducer/UserSlice";
import { removeTOCart } from "../../Redux/reducer/CartSlice";
import { MainContext } from "../../Context/Context";

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState("account");
  const user = useSelector((state) => state.user.data);
  const location = useLocation();
  const openTab = location.state?.openTab;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [isUpdatingContact, setIsUpdatingContact] = useState(false);

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState("");

  const { API_BASE_URL, User_URL, toastMsg } = useContext(MainContext);

  useEffect(() => {
    setContactValue(user?.contact || "");
  }, [user?.contact]);

  useEffect(() => {
    if (openTab) setActiveTab(openTab);
  }, [openTab]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/order/get-orders`);
        setOrders(res.data.Orders);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (activeTab === "address") {
        try {
          setAddressLoading(true);
          setAddressError("");
          const res = await axios.get(`${API_BASE_URL}${User_URL}/get-addresses/${user._id}`);
          setAddresses(res.data.addresses || []);
        } catch (error) {
          console.log(error);
          setAddressError("Failed to fetch addresses");
        } finally {
          setAddressLoading(false);
        }
      }
    };
    fetchAddresses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, user?._id]);








  const handleLogout = () => {

  Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to access your profile after logging out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        
    dispatch(logout());
    dispatch(removeTOCart());
    navigate("/");
        Swal.fire('Logged out!', 'You have been logged out.', 'success');
      }
    });


  };

  const handleContactUpdate = async () => {
    if (!contactValue.trim()) {
      toastMsg("Contact number cannot be empty", 0);
      return;
    }

    setIsUpdatingContact(true);
    try {
      const res = await axios.put(`${API_BASE_URL}${User_URL}/update-contact/${user._id}`, {
        contact: contactValue,
      });

      if (res.data.status === 1) {
        toastMsg("Contact updated successfully", 1);
        setIsEditingContact(false);
        dispatch(updateContact());
      } else {
        throw new Error(res.data.msg || "Failed to update contact");
      }
    } catch (error) {
      console.log(error);
      toastMsg("Failed to update contact. Try again.");
    } finally {
      setIsUpdatingContact(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Breadcrumb */}
      <div className="bg-gray-200 text-black mt-2 flex justify-between items-center p-3 px-6 rounded-3xl">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li><Link to="/" className="text-sm font-medium hover:text-[#00BBA7]">Home</Link></li>
            <li className="flex items-center">
              <HiChevronRight className="w-5 h-5 text-gray-400 mx-1" />
              <span className="text-sm font-medium text-gray-400">Profile</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Profile Layout */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">

        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <img src="/myimage2.jpg" alt="User" className="w-24 h-24 rounded-full mx-auto mb-3" />
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <div className="space-y-2">
            {["account", "order", "address", "password"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full px-4 py-2 flex justify-between items-center rounded-lg 
                transition-all ${activeTab === tab ? "bg-teal-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
              >
                <span>
                  {tab === "account" ? "Account Info" :
                    tab === "order" ? "My Orders" :
                      tab === "address" ? "My Addresses" : "Change Password"}
                </span>
                <span>&rarr;</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              Logout <IoIosLogOut />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-md">

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Account Info</h2>
              <div>
                <label className="block mb-1 text-sm font-medium">Name</label>
                <input value={user?.name} readOnly className="w-full bg-gray-100 border p-2 rounded" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input value={user?.email} readOnly className="w-full bg-gray-100 border p-2 rounded" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Contact</label>
                {isEditingContact ? (
                  <div className="flex gap-2">
                    <input
                      className="flex-1 p-2 border rounded"
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                    />
                    <button onClick={handleContactUpdate} disabled={isUpdatingContact} className="bg-teal-600 text-white p-2 rounded">
                      {isUpdatingContact ? <Loader2 className="animate-spin" /> : <Check />}
                    </button>
                    <button onClick={() => setIsEditingContact(false)} className="bg-gray-300 p-2 rounded">
                      <X />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <input value={contactValue || "N/A"} readOnly className="w-full bg-gray-100 border p-2 rounded" />
                    <button onClick={() => setIsEditingContact(true)} className="ml-2 p-2 bg-teal-600 text-white rounded"><Edit /></button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "order" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">My Orders</h2>
              {loading ? (
                <div className="text-center py-10"><Loader2 className="animate-spin w-8 h-8 text-teal-600" /></div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-10">
                  <FaShoppingCart className="mx-auto text-4xl text-gray-400 mb-2" />
                  <h3 className="text-lg font-semibold">No orders placed yet</h3>
                  <Link to="/product" className="mt-3 inline-block bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">Start Shopping</Link>
                </div>
              ) :  (
                orders?.map((order) => (
                  <div
                    key={order._id}
                    className="border border-gray-200 rounded-md p-4 bg-white shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-700 border-b pb-2 mb-4 gap-4">
                      <div className="flex flex-col md:flex-row gap-8 flex-wrap">
                        <div>
                          <p className="font-semibold">ORDER PLACED</p>
                          <p>
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              { day: "numeric", month: "long", year: "numeric" }
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">TOTAL</p>
                          <p className="text-xl font-bold text-green-700">
                            ₹{order.order_total}
                          </p>
                        </div>
                        <div className="relative group cursor-pointer">
                          <p className="font-semibold">SHIP TO</p>
                          <p className="text-[#2162a1] flex items-center gap-1 text-md">
                            {user?.name}{" "}
                            <MdKeyboardArrowDown className="text-xl" />
                          </p>
                          <div className="absolute z-10 top-full mt-1 left-0 w-64 bg-white border border-gray-300 rounded-md shadow-lg text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                            <p className="font-semibold mb-1">
                              Shipping Address:
                            </p>
                            <p>
                              {order.shipping_details.addressLine1},{" "}
                              {order.shipping_details.addressLine2}
                            </p>
                            <p>
                              {order.shipping_details.city},{" "}
                              {order.shipping_details.state} -{" "}
                              {order.shipping_details.postalCode}
                            </p>
                            <p>{order.shipping_details.country}</p>
                            <p className="mt-1 text-gray-500">
                              Phone: {user?.contact}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="font-semibold break-words">
                          ORDER # {order._id.toUpperCase()}
                        </p>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-[#2162a1] hover:underline cursor-pointer"
                        >
                          View order details
                        </button>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-green-700 mb-2">
                      Delivered{" "}
                      {new Date(
                        new Date(order.createdAt).getTime() +
                          5 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Package was handed to resident
                    </p>
                    {order.product_details.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 border border-gray-200 rounded-md p-4 mb-4 gap-4"
                      >
                        <div className="flex gap-4 w-full sm:w-auto">
                          <img
                            src={
                              item?.product_id?.main_image
                                ? `${API_BASE_URL}/images/products/${item?.product_id?.main_image}`
                                : "/default-image.png"
                            }
                            alt={item?.product_id?.name || "Product Image"}
                            className="w-20 h-20 object-contain border rounded-md bg-white p-1"
                          />
                          <div>
                            <Link
                              to={`/single-Product/${item?.product_id?._id}`}
                              className="text-sm font-medium text-[#2162a1] hover:underline"
                            >
                              {item?.product_id?.short_description}
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">
                              Qty: {item.qty}
                            </p>
                            <p className="text-sm text-gray-700 font-semibold">
                              ₹{item.total}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Return window closed on{" "}
                              {new Date(
                                new Date(order.createdAt).getTime() +
                                  15 * 24 * 60 * 60 * 1000
                              ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
              {selectedOrder && (
                <OrderDetailsModal
                  order={selectedOrder}
                  user={user}
                  API_BASE_URL={API_BASE_URL}
                  onClose={() => setSelectedOrder(null)}
                />
              )}
            </div>
          )}

          {activeTab === "address" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Saved Addresses</h2>
              {addressLoading ? (
                <div className="text-center"><Loader2 className="animate-spin w-6 h-6" /></div>
              ) : addressError ? (
                <p className="text-red-500">{addressError}</p>
              ) : addresses.length === 0 ? (
                <p className="text-gray-500">No saved addresses available.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr, idx) => (
                    <div key={idx} className="border p-4 bg-gray-50 rounded">
                      <p>{addr.addressLine1}</p>
                      <p>{addr.addressLine2}</p>
                      <p>{addr.city}, {addr.state} - {addr.postalCode}</p>
                      <p>{addr.country}</p>
                      <p className="mt-1 text-sm text-gray-600">Contact: {user?.contact || "N/A"}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

           {activeTab === "password" && (
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Change Password
              </h2>
              <form className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter current password"
                    required
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-2 rounded-xl cursor-pointer hover:bg-teal-700 transition duration-200"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const OrderDetailsModal = ({ order, user, onClose, API_BASE_URL }) => {
  if (!order) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 px-2">
      <div className="relative mt-4 w-full max-w-4xl rounded-lg bg-white p-4 sm:p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl sm:text-2xl cursor-pointer text-gray-500 hover:text-red-600"
        >
          <MdClose />
        </button>
        <h2 className="mb-6 flex flex-wrap items-center gap-2 text-2xl sm:text-3xl font-bold">
          <FaBuilding className="text-[#2162a1]" />
          Order Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <section>
            <h3 className="mb-2 flex items-center gap-2 text-base sm:text-lg font-semibold">
              <FaUser className="text-indigo-600" />
              Customer Information
            </h3>
            <ul className="space-y-1 text-sm break-words">
              <li>
                <strong>Name:</strong> {user?.name}
              </li>
              <li>
                <strong>Email:</strong> {user?.email}
              </li>
              <li>
                <strong>Contact:</strong> {user?.contact}
              </li>
            </ul>
          </section>
          <section>
            <h3 className="mb-2 flex items-center gap-2 text-base sm:text-lg font-semibold">
              <FaShippingFast className="text-green-600" />
              Shipping Address
            </h3>
            <p className="text-sm">
              {order.shipping_details.addressLine1},{" "}
              {order.shipping_details.addressLine2}
            </p>
            <p className="text-sm">
              {order.shipping_details.city}, {order.shipping_details.state} –{" "}
              {order.shipping_details.postalCode}
            </p>
            <p className="text-sm">{order.shipping_details.country}</p>
          </section>
        </div>
        <section className="mt-6 sm:mt-8">
          <h3 className="mb-3 flex items-center gap-2 text-base sm:text-lg font-semibold">
            <FaClipboardList className="text-amber-600" />
            Order Summary
          </h3>
          <div className="rounded-lg border bg-gray-50 p-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <p>
                <strong>Order ID:</strong>{" "}
                <span className="text-[#2162a1] break-all">{order._id}</span>
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Total Amount:</strong>{" "}
                <span className="font-semibold text-green-600">
                  ₹{order.order_total}
                </span>
              </p>
              <p>
                <strong>Payment Mode:</strong>{" "}
                {order.payment_mode ? "Online Payment" : "Cash on Delivery"}
              </p>
            </div>
          </div>
        </section>
        <section className="mt-6 sm:mt-8">
          <h3 className="mb-3 flex items-center gap-2 text-base sm:text-lg font-semibold">
            <FaShoppingCart className="text-orange-600" />
            Products
          </h3>
          <div className="overflow-x-auto rounded-md border bg-white">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
                  <th className="px-3 py-2">Product ID</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Image</th>
                  <th className="px-3 py-2 text-center">Quantity</th>
                  <th className="px-3 py-2 text-right">Item Total</th>
                </tr>
              </thead>
              <tbody>
                {order.product_details.map((item, idx) => (
                  <tr key={idx} className="border-b last:border-none">
                    <td className="px-3 py-3 break-words text-[#2162a1] max-w-[160px]">
                      {item?.product_id?._id}
                    </td>
                    <td className="px-3 py-3 break-words max-w-[200px]">
                      <Link
                        to={`/single-Product/${item?.product_id?._id}`}
                        className="hover:underline hover:text-[#2162a1]"
                      >
                        {item?.product_id?.name}
                      </Link>
                    </td>
                    <td className="px-3 py-3">
                      <img
                        src={`${API_BASE_URL}/images/products/${item?.product_id?.main_image}`}
                        alt={item?.product_id?.name}
                        className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded border bg-white p-1"
                      />
                    </td>
                    <td className="px-3 py-3 text-center">{item.qty} pc</td>
                    <td className="px-3 py-3 text-right font-semibold text-green-600">
                      ₹{item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};