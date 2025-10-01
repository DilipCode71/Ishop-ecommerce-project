import { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import { Mail, Lock, LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import { MainContext } from "../../Context/Context";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/reducer/UserSlice";
import { moveToCartDataSave } from "../../Redux/reducer/CartSlice";

function UserLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { toastMsg, API_BASE_URL, User_URL } = useContext(MainContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const cartData = useSelector((state) => state.cart.data);

  const userLoginSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    axios
      .post(API_BASE_URL + `${User_URL}/login`, data)
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          dispatch(
            login({ data: success.data.user, token: success.data.token })
          );

          axios
            .post(
              API_BASE_URL + User_URL+`/movetodb/${success?.data.user?._id}`,cartData)
            .then((response) => {
              const latestCart = response.data.latestCart;
              let totalOriginalPrice = 0;
              let totalFinalPrice = 0;

              const CartDatas = latestCart.map((cartItem, cartIndex) => {
                totalOriginalPrice += cartItem.product_id.original_price * cartItem.qty;
                totalFinalPrice +=cartItem.product_id.final_price * cartItem.qty;
                return {
                  productId: cartItem.product_id._id,
                  qty: cartItem.qty,
                };
              });

              dispatch(
                moveToCartDataSave({
                data:CartDatas,
                totalOriginalPrice:totalOriginalPrice,
                totalFinalPrice:totalFinalPrice
              }))
            })
            .catch((error) => {
              console.log(error);
            });

          if (searchParams.get("ref") == "cart") {
            navigate("/cart");
          }else if (searchParams.get("ref") == "checkout") {
               navigate("/checkout");
          }  else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className=" bg-gray-200 text-black mt-2 flex justify-between items-center p-3 px-6 rounded-3xl">
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
                <span className="text-sm font-medium text-gray-400">Login</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="w-full lg:min-h-screen bg-gray-50 flex items-center justify-center lg:p-4 ">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-teal-50 p-8  items-center justify-center hidden md:flex">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-teal-800 mb-6">
                Welcome Back
              </h2>
              <p className="text-teal-600 mb-8">
                Login to access your account and continue your journey with us.
              </p>
              <div className="relative h-64 w-full">
                <img
                  src="/login.svg.png"
                  alt="Login"
                  className="rounded-xl object-cover h-full w-full"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8">
            <div className="max-w-md mx-auto">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-teal-800">Login</h2>
                <p className="text-gray-500 mt-1">
                  Please login to your account
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={userLoginSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      placeholder="Email Address*"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      required
                      name="email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Lock size={18} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      required
                      name="password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-teal-600 hover:text-teal-500 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none cursor-pointer"
                >
                  Login
                </button>
              </form>

              <div className="text-center mt-8">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to={`/register?${searchParams.toString()}`}
                    className="font-medium text-teal-600 hover:text-teal-500 transition-colors"
                  >
                    Register Here
                  </Link>
                </p>
              </div>

              {/* to={`/register?${searchParams.toString()}`} */}

              <div className="relative mt-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="sr-only">Sign in with Google</span>
                  <img
                    src="\google-color-svgrepo-com.svg"
                    alt="Google"
                    className="h-5 w-5"
                  />
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="sr-only">Sign in with Facebook</span>
                  <img
                    src="\facebook-1-svgrepo-com.svg"
                    alt="Facebook"
                    className="h-5 w-5"
                  />
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="sr-only">Sign in with GitHub</span>
                  <img
                    src="\github-code-source-svgrepo-com.svg"
                    alt="GitHub"
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserLoginForm;
