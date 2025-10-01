import React from 'react'
import { FiTwitter, FiFacebook, FiInstagram, FiYoutube, FiLinkedin,FiGlobe } from 'react-icons/fi';

import { LaptopIcon } from 'lucide-react';


function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <LaptopIcon className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-white">ISHOP</span>
            </div>
            <p className="mb-4">ISHOP - 1ST NYC TECH ONLINE MARKET</p>
            <div className="mb-4">
              <p className="text-sm text-gray-400">HOTLINE 24/7</p>
              <p className="text-xl text-orange-500 font-semibold">(025) 3686 25 16</p>
            </div>
            <p className="text-sm mb-1">Sarpanch PG, M-23, Tonk Rd, Telephone Colony, Madhuvan Colony, Barkat Nagar, Tonk Phatak, Jaipur, Rajasthan 302015</p>
            <p className="text-sm mb-4">NY 10092</p>
            <p className="text-sm mb-6">contact@ISHOP.com</p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors">
                <FiTwitter />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors">
                <FiFacebook />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors">
                <FiInstagram />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors">
                <FiYoutube />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors">
                <FiLinkedin />
              </a>
            </div>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">TOP CATEGORIES</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Laptops</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">PC & Computers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Cell Phones</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Tablets</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Gaming & VR</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Networks</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Cameras</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Sounds</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Office</a></li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">COMPANY</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-orange-500 transition-colors">About Ishop</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Career</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Sitemap</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Store Locations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">HELP CENTER</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Customer Service</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">My Account</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Product Support</a></li>
            </ul>
          </div>
          


          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">PARTNER</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Become Seller</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Affiliate</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Advertise</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Partnership</a></li>
            </ul>
            
           


          </div>
        </div>

<div className="max-w-7xl mx-auto mt-10 text-center">
        <h3 className="font-semibold text-md">SUBSCRIBE & GET <span className="text-red-500">10% OFF</span> FOR YOUR FIRST ORDER</h3>
        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center">
          <input type="email" placeholder="Enter your email address" className="border-b p-2 w-full sm:w-1/3 outline-none " />
          <button className=" text-red-500 font-bold cursor-pointer">SUBSCRIBE</button>
        </div>
        <p className="mt-2 text-gray-500 text-sm">By subscribing, you're accepting our <span className="underline cursor-pointer">Policy</span></p>
      </div>


        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0"> ©{new Date().getFullYear()}  Ishop. All Rights Reserved</p>
          <div className="flex space-x-4">
            <img src="https://cdn-icons-png.flaticon.com/128/5968/5968299.png" alt="PayPal" className="h-8 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/128/349/349247.png" alt="MasterCard" className="h-8 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="Visa" className="h-8 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/128/5968/5968327.png" alt="Stripe" className="h-8 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="Klarna" className="h-8 w-auto" />
          </div>
          <div className="flex space-x-4 items-center mt-2 sm:mt-0">
          <div className="border px-3 py-1 rounded-md">USD</div>
          <div className="border px-3 py-1 rounded-md flex items-center"><FiGlobe className="mr-1" /> Eng</div>
        </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer