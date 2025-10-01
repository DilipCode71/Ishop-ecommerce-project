
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import axios from "axios";
import { MainContext } from "../../Context/Context";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/reducer/CartSlice";
import { formatPriceINR } from "../../helper";

export default function SingleProduct() {
  const { ProductsId } = useParams();
  const { API_BASE_URL, Product_URL, User_URL } = useContext(MainContext);
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const images = [
    `${API_BASE_URL}/images/products/${product.main_image}`,
    ...(product.other_image || []).map(
      (img) => `${API_BASE_URL}/images/products/${img}`
    ),
  ];

  const handlerAddToCart = (data) => {
    dispatch(addToCart({ ...data, quantity }));

    if (user) {
      axios.post(API_BASE_URL + User_URL + "/addToCart", {
        user_id: user._id,
        product_id: product._id,
        quantity,
      }).catch(console.error);
    }
  };

  const handleBuyNow = () => {
    handlerAddToCart({
      productId: product._id,
      original_price: product.original_price,
      final_price: product.final_price,
      name: product.name,
      main_image: product.main_image,
    });

    if (user) {
      navigate("/checkout");
    } else {
      navigate("/login?ref=checkout");
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}${Product_URL}/${ProductsId}`)
      .then((res) => {
        const p = res.data.product;
        setProduct(p);
        setMainImage(`${API_BASE_URL}/images/products/${p.main_image}`);
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ProductsId]);

  return (
    <div className="max-w-[1490px] mx-auto px-4 sm:px-6 py-1">
      <div className="bg-gray-200 text-black mt-2 flex justify-between items-center p-3 px-6 rounded-3xl mb-6">
        <nav className="flex overflow-x-auto whitespace-nowrap">
          <ol className="inline-flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="font-medium hover:text-[#00BBA7]">
                Home
              </Link>
            </li>
            <li className="inline-flex items-center">
              <HiChevronRight className="w-5 h-5 text-gray-400 mx-1" />
              <Link to="/product" className="font-medium hover:text-[#00BBA7]">
                Products
              </Link>
            </li>
            <li className="inline-flex items-center">
              <HiChevronRight className="w-5 h-5 text-gray-400 mx-1" />
              <span className="text-gray-400">Details</span>
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumb ${i}`}
                className={`w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-md border-2 cursor-pointer transition-all ${
                  mainImage === img ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div className="relative w-full h-[350px] sm:h-[400px] lg:h-[450px] bg-gray-50 flex items-center justify-center rounded-xl overflow-hidden shadow-sm">
            {mainImage && (
              <img
                src={mainImage}
                alt="Main"
                className="w-full h-full object-contain p-4"
              />
            )}
          </div>
        </div>

        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-gray-800">{product.short_description}</h1>

          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">★★★★★</div>
            <span className="text-sm text-gray-500">(4.5)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-green-600">
              {formatPriceINR(product.final_price)}
            </span>
            {product.original_price && (
              <span className="text-lg text-red-500 line-through">
                {formatPriceINR(product.original_price)}
              </span>
            )}
            {product.discount_percentage && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                Save {product.discount_percentage}%
              </span>
            )}
          </div>

          <div className="text-gray-600 text-sm leading-relaxed shadow-sm bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">Description</h3>
            <div dangerouslySetInnerHTML={{ __html: product.long_description || "No description available" }} />
          </div>

        
          {product.color?.length > 0 && (
            <div className="space-y-3 shadow-sm bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800">Color: {product.color[0]?.ColorName}</h3>
              <div className="flex flex-wrap gap-2">
                {product.color.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 ${
                      color.ColorName === product.color[0]?.ColorName
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.ColorPickerName }}
                    title={color.ColorName}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="bg-gray-50 p-5 rounded-xl shadow-md space-y-4">
            <div>
              <span className="text-sm text-gray-600">Total Price:</span>
              <p className="text-2xl font-bold text-gray-800">
                {formatPriceINR(product.final_price)}
              </p>
              <p className={`text-sm ${product.stock ? "text-green-600" : "text-red-600"}`}>
                {product.stock ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, value));
                  }}
                  className="w-12 text-center border-x border-gray-300 outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button (with Icon) */}
            <button
              onClick={() =>
                handlerAddToCart({
                  productId: product._id,
                  original_price: product.original_price,
                  final_price: product.final_price,
                  name: product.name,
                  main_image: product.main_image,
                })
              }
              disabled={!product.stock}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 cursor-pointer ${
                product.stock
                  ? "bg-[#00BBA7] hover:bg-[#009982] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </button>

            {/* Buy Now Button (with Icon) */}
            <button
              onClick={handleBuyNow}
              disabled={!product.stock}
              className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 cursor-pointer ${
                product.stock
                  ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Buy Now
            </button>

            <div className="flex justify-between pt-2">
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                <span className="text-red-400">❤</span> Add to Wishlist
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                <span className="text-blue-400">⇄</span> Compare
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow-md space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-gray-600">Ships from India</p>
              </div>
            </div>

            <div className="pt-3">
              <p className="text-sm text-gray-600 mb-2">Guaranteed Safe Checkout</p>
              <div className="flex flex-wrap gap-3 cursor-pointer">
                <img src="/visa.png" alt="Visa" className="h-6" />
                <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                <img src="/paypal.png" alt="PayPal" className="h-6" />
                <img src="/american-express.jpg" alt="Amex" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}