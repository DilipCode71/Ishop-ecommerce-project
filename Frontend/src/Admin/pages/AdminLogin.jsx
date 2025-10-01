import React, { useContext, useEffect, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MainContext } from '../../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/reducer/AdminSlice';

function AdminLogin() {

    const [showPassword, setShowPassword] = useState(false);

   
   const dispatch= useDispatch()

   const {toastMsg, API_BASE_URL,Admin_URL} =useContext(MainContext)

  const navigate= useNavigate()




    const loginSubmit=(event)=>{

      event.preventDefault();


      const data={
          email:event.target.email.value,
          password:event.target.password.value
      }

      axios.post(API_BASE_URL+ Admin_URL+"/login",data).then(
        (success)=>{
            toastMsg(success.data.msg,success.data.status);
            if(success.data.status==1){
              dispatch(login({data:success.data.admin,token:success.data.token}))
              navigate("/admin");
            }
        }
      ).catch(
        (error)=>{
          console.log(error);
          toastMsg("Internal server error",0)
        }
      )

    }



    
  const admin=useSelector((state)=>state.admin.data)
  const localstorageData=JSON.parse(localStorage.getItem("adminLogin"));



  useEffect(
    ()=>{
     if(admin||localstorageData){
      navigate("/admin")
     }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
  )


  return (

    <div className="flex flex-col min-h-screen bg-gray-50">
    <header className="bg-blue-700 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <nav>
          <ul className="flex space-x-4 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
          </ul>
        </nav>
      </div>
    </header>


    <main className="flex-grow flex justify-center items-center">
    <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Login to Admin Account
      </h2>

      <form className="space-y-4" onSubmit={loginSubmit}> 
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
            //   autoComplete="current-password"
            
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600 cursor-pointer"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <a href="#" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
    </main>

    <footer className="bg-gray-100 text-gray-600 text-sm text-center py-4 mt-8 border-t">
      <p>© {new Date().getFullYear()} Admin Panel. All rights reserved.</p>
    </footer>
  </div>
  )
}

export default AdminLogin