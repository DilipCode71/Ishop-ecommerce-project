import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../Context/Context";
import { useSelector } from "react-redux";
import axios from "axios"; 

const AddAddress = () => {
  const navigate = useNavigate();
  const { toastMsg, API_BASE_URL, User_URL } = useContext(MainContext);
  const user = useSelector((state) => state.user.data);

 const [formData, setFormData] = useState({
  addressLine1: "",      
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
});


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     const { addressLine1, city, state, postalCode, country } = formData;

  if (!addressLine1 || !city || !state || !postalCode || !country) {
    toastMsg("Please fill all required fields", 0);
    return;
  }

    try {
      const res = await axios.post(
        `${API_BASE_URL}${User_URL}/add-address/${user._id}`,
        formData
      );


      if (res.data.status === 1) {
        toastMsg("Address added successfully!", 1);
        navigate("/checkout");
      } else {
        toastMsg(res.data.msg || "Failed to add address",0);
      }
    } catch (err) {
      console.error("Error:", err);
      toastMsg("Something went wrong while adding address", 0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Address
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Address Line 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLinel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g. House no, Street, Landmark"
            />
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="e.g. Apartment, Suite, Unit"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-md font-semibold hover:bg-teal-600 transition"
            >
              Add Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
