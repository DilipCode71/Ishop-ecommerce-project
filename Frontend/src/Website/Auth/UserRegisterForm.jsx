import React, { useState, useContext } from 'react';
import { HiChevronRight } from "react-icons/hi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/reducer/UserSlice';
import { MainContext } from '../../Context/Context';
import { useForm } from 'react-hook-form';

function UserRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { API_BASE_URL, toastMsg, User_URL } = useContext(MainContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const password = watch("password");

  const userRegisterSubmit = (data) => {
    axios.post(API_BASE_URL + `${User_URL}/create`, data)
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          dispatch(login({ data: success.data.user, token: success.data.token }));
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />

      <div className="text-black mt-2 bg-gray-200 flex justify-between items-center p-3 px-6 rounded-3xl">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li className="inline-flex items-center">
              <Link to="/" className="inline-flex items-center text-sm cursor-pointer font-medium hover:text-[#00BBA7]">Home</Link>
            </li>
            <li className="inline-flex items-center">
              <Link to="#" className="inline-flex items-center text-sm font-medium cursor-pointer hover:text-[#00BBA7]">
                <HiChevronRight className="w-5 h-5 text-gray-400 mx-1" />
                Pages
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <HiChevronRight className="w-5 h-5 text-gray-400 mx-1" />
                <span className="text-sm font-medium text-gray-400">Register</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="w-full lg:min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl transition-all duration-300 hover:shadow-xl">

          <div className="w-full md:w-1/2 bg-teal-50 items-center justify-center p-6 hidden md:flex">
            <div className="relative w-full max-w-md">
              <div className="absolute top-0 left-0 w-20 h-20 bg-teal-100 rounded-full opacity-60"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-teal-200 rounded-full opacity-70"></div>
              <img src="\login.svg.png" alt="Registration Illustration" className="w-full h-auto rounded-lg relative z-10 shadow-md" />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-10">
            <div className="space-y-1.5 mb-8">
              <h2 className="text-2xl font-bold text-teal-800">Create Account Register</h2>
              <p className="text-gray-500">Join us and get started today</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(userRegisterSubmit)}>
              <div>
                <label className="block text-gray-700 font-medium mb-1.5">Full Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Enter your full name..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1.5">Email Address</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1.5">Password</label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="******"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    {...register("CnfPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match"
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="******"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.CnfPassword && <p className="text-red-500 text-sm">{errors.CnfPassword.message}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-teal-600 flex items-center justify-center group"
                >
                  <span>Create Account</span>
                  <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to={`/login?${searchParams.toString()}`} className="text-teal-600 font-medium hover:text-teal-700">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserRegisterForm;
