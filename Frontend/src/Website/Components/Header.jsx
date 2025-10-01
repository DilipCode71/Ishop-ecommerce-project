import {  useState } from "react";
import {
  FaPhoneAlt,
  FaShoppingCart,
  FaAngleDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AllCategorySearchbar from "./AllCategorySearchbar";
import { useSelector } from "react-redux";
import { formatPriceINR } from "../../helper";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.data);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1500px] mx-auto">

        {/* Top bar for desktop */}
        <div className="hidden md:flex justify-between items-center px-6 py-2 text-sm bg-gray-100">
          <div className="flex items-center space-x-2">
            <span className="bg-gray-200 px-2 py-1 rounded text-xs flex items-center">
              <FaPhoneAlt className="mr-1" /> Hotline 24/7
            </span>
            <span className="font-bold">+91 6378553819</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-black">
              Sell on Ishop
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              Order Tracking
            </a>
            <div className="flex items-center space-x-1 cursor-pointer">
              <span>USD</span>
              <FaAngleDown />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer">
              <span>Hindi</span>
              <FaAngleDown />
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="flex justify-between items-center px-6 py-4 bg-white md:flex-row flex-row-reverse">

          {/* Mobile Cart icon + menu toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cart.data.length}
              </span>
            </Link>

            <button className="text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Logo */}
          <Link to={'/'}>
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src="/logo.png"
                alt="iShop Logo"
                className="w-12 h-12 object-contain rounded-2xl"
              />
              <span className="text-2xl font-bold hover:text-teal-500">
                I Shop
              </span>
            </div>
          </Link>

          {/* Navigation menu */}
          <nav
            className={`absolute md:static top-20 left-0 w-full md:w-auto bg-white z-20 md:flex shadow-md md:shadow-none px-6 md:px-0 py-4 md:py-0 transition-all ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 font-medium">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-teal-500 font-bold"
              >
                HOME
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-teal-500 font-bold"
              >
                ABOUT
              </Link>
              <Link
                to="/product"
                onClick={() => setMenuOpen(false)}
                className="hover:text-teal-500 font-bold"
              >
                PRODUCTS
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-teal-500 font-bold"
              >
                CONTACT
              </Link>

              {/* Mobile user welcome/login */}
              <div className="flex items-center space-x-2 mt-4 md:hidden">
                {user?.name ? (
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2">
                   <FaUserCircle className="w-6 h-6 text-gray-600" />
                    <h3 className="text-sm font-bold">Welcome, {user.name}</h3>
                  </Link>
                ) : (
                  <div>
                    <h3 className="text-sm font-bold">Welcome</h3>
                    <Link
                      to={`/login?ref=home`}
                      onClick={() => setMenuOpen(false)}
                      className="font-bold hover:text-teal-500 text-sm"
                    >
                      LOG IN / REGISTER
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Desktop user profile + cart */}
          <div className="hidden md:flex items-center space-x-6">

            <div className="flex items-center space-x-2 cursor-pointer relative group">
                               <FaUserCircle className="w-6 h-6 text-gray-600" />

              {user?.name ? (
                <Link to={'/profile'}>
                <div className="flex items-center space-x-2 select-none">
                  <span className="text-sm font-semibold text-gray-800">
                    Welcome, {user.name}
                  </span>
                  <FaAngleDown className="text-gray-600 text-sm" />
                </div>
                </Link>


              ) : (
                <div className="flex items-center space-x-1 select-none">
                  <span className="text-sm font-semibold text-gray-800">Welcome</span>
                  <Link
                    to={`/login?ref=home`}
                    className="font-bold hover:text-teal-500 text-sm"
                  >
                    LOG IN / REGISTER
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <Link to="/cart">
                <FaShoppingCart className="text-gray-600 text-xl" />
                <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cart?.data?.length}
                </span>
              </Link>
            </div>

            {/* Cart price summary */}
            <div className="flex flex-col text-sm select-none">
              <span>Cart</span>
              <span className="font-bold">{formatPriceINR(cart?.totalFinalPrice || 0)}</span>
            </div>

          </div>
        </div>
      </div>

      <AllCategorySearchbar />
    </header>
  );
}

export default Header;
