import React, { useState, useContext } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MainContext } from '../../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminRegister() {

  const [showPassword, setShowPassword] = useState(false);
  const { toastMsg, API_BASE_URL, Admin_URL } = useContext(MainContext);
  const navigate = useNavigate();

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
    };

    axios.post(`${API_BASE_URL}${Admin_URL}/register`, data)
      .then((res) => {
        toastMsg(res.data.msg, res.data.status);
        if (res.data.status === 1) {
          navigate('/admin/login'); 
        }
      }).catch(
        (error) => {
          console.log(error);
        toastMsg("Internal server error", 0);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Panel - Register</h1>
        </div>
      </header>

      <main className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Admin Account
          </h2>

          <form className="space-y-4" onSubmit={registerSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </span>
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/admin-login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </main>

      <footer className="bg-gray-100 text-gray-600 text-sm text-center py-4 mt-8 border-t">
        <p>© {new Date().getFullYear()} Admin Panel. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminRegister;
