import React, { useContext, useEffect } from "react";
import { FaTrash, FaEdit, FaEye, FaPlus, FaStar,FaRegStar , FaImage, FaCheck,FaTimes  } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MainContext } from "../../../Context/Context";
import axios from "axios";
import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';
import JoditEditor from "jodit-react"; 
import { useSelector } from "react-redux";


function Viewproduct() {
  const { toastMsg, fetchAllProduct, AllProduct, API_BASE_URL, Product_URL } = useContext(MainContext);
const admin=useSelector((state)=>state.admin)

  // Delete products api start
  const deleteProductView=(id)=>{


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {



        axios.delete(API_BASE_URL+Product_URL+`/delete/${id}`,
          {
            headers:{
              Authorization: `Bearer ${admin.token}`
            }
          }
        ).then(
          (success)=>{  
    
            toastMsg(success.data.msg,success.data.status)
    
            if(success.data.status==true){
              fetchAllProduct()
            }
    
          }
        ).catch(
          (error)=>{
            console.log(error);
          }
        )


       
      }
    });



  }

  // Delete products api start



  // Status update api start

  const statusUpdate=(id,flag)=>{
    axios.patch(API_BASE_URL+Product_URL+`/update/${id}`, {flag},{
      headers:{
        Authorization: `Bearer ${admin.token}`
      }
    })
    .then(
      (success)=>{
        toastMsg(success.data.msg,success.data.status);
        if(success.data.status==true){
          fetchAllProduct()
        }
      }
    ).catch(
      (error)=>{
        console.log(error);
        toastMsg("Internal server error",0)
      }
    )
  }

  // status Update api start



  // View productDetails   start



  const viewProductDetails=(productViewData)=>{

    const productDetails=ReactDOMServer.renderToString(<PopUpProduct productViewData={productViewData} API_BASE_URL={API_BASE_URL} />)
    Swal.fire({
      title: "<strong class='text-2xl text-blue-400 font-semibold'>Product Details</strong>",
      width: '90%',
      background: '#0f172a', // Dark slate background
      html: productDetails,
      showCloseButton: true,
      showConfirmButton: false,
    
      customClass: {
        popup: 'rounded-2xl shadow-2xl border border-gray-700 p-6',
        htmlContainer: 'text-left font-sans text-gray-100 text-[15px] leading-relaxed max-h-[75vh] overflow-y-auto',
        closeButton: 'hover:bg-red-500 hover:text-white text-white rounded-full transition duration-300 ease-in-out',
      },
    });
    
    
  }

  // View productDetails End



  useEffect(() => {
    fetchAllProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8">
  <div className="container mx-auto px-4">
    <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700">
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Products</h2>
            <p className="text-sm text-gray-400 mt-1">Manage your product inventory</p>
          </div>
          <Link to="add">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-all px-4 py-2 rounded-xl text-white font-medium shadow-lg hover:shadow-blue-500/20 group">
              <FaPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Add Product</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full table-fixed">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="w-[20%] px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Name</th>
              <th className="w-[15%] px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Price</th>
              <th className="w-[12%] px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
              <th className="w-[15%] px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Color</th>
              <th className="w-[10%] px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Image</th>
              <th className="w-[10%] px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Stock</th>
              <th className="w-[18%] px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-700/50">
            {Array.isArray(AllProduct) && AllProduct.map((productViewData) => (
              <tr key={productViewData._id} className="hover:bg-gray-800/30 transition-colors">
                {/* Name */}
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-200  line-clamp-2">{productViewData.name}</div>
                </td>

                {/* Price */}
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-blue-400">
                      ${productViewData.final_price}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="line-through text-xs text-gray-500">${productViewData.original_price}</span>
                      <span className="text-[11px] font-medium text-green-400">
                        ({productViewData.discount_percentage}% off)
                      </span>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-white text-[14px] line-clamp-2">
                    {productViewData?.category_id?.CategoryName}
                  </span>
                </td>

                {/* Color */}
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {productViewData.color.map((colorData) => (
                      <span key={colorData._id} className="text-[14px] text-gray-300 line-clamp-2">
                        {colorData.ColorName}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Image */}
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700 overflow-hidden">
                    <img 
                      src={API_BASE_URL + `/images/products/${productViewData.main_image}`} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                {/* Stock */}
                <td className="px-4 py-3">
                  {productViewData.stock ? (
                    <span
                      onClick={() => statusUpdate(productViewData._id, 1)}
                      className="px-2 py-1 bg-green-900/50 text-green-400 rounded-full text-xs cursor-pointer border border-green-500/20 hover:bg-green-800/50"
                    >
                      In Stock
                    </span>
                  ) : (
                    <span
                      onClick={() => statusUpdate(productViewData._id, 1)}
                      className="px-2 py-1 bg-red-900/50 text-red-400 rounded-full text-xs cursor-pointer border border-red-500/20 hover:bg-red-800/50"
                    >
                      Out of Stock
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {/* Status */}
                    <button
                      onClick={() => statusUpdate(productViewData._id, 2)}
                      className="p-1.5 rounded-lg border transition-colors"
                      title={productViewData.status ? "Active" : "Inactive"}
                      style={{
                        backgroundColor: productViewData.status ? '#1c4532' : '#442727',
                        borderColor: productViewData.status ? '#04785740' : '#991b1b40',
                        color: productViewData.status ? '#34d399' : '#f87171'
                      }}
                    >
                      {productViewData.status ? <FaCheck className="w-4 h-4" /> : <FaTimes className="w-4 h-4" />}
                    </button>

                    {/* Featured */}
                    <button
                      onClick={() => statusUpdate(productViewData._id, 3)}
                      className="p-1.5 rounded-lg border transition-colors"
                      title={productViewData.top_selling ? "Featured" : "Not Featured"}
                      style={{
                        backgroundColor: productViewData.top_selling ? '#453821' : '#2d374850',
                        borderColor: productViewData.top_selling ? '#d9770640' : '#4a556840',
                        color: productViewData.top_selling ? '#f59e0b' : '#a0aec0'
                      }}
                    >
                      {productViewData.top_selling ? <FaStar className="w-4 h-4" /> : <FaRegStar className="w-4 h-4" />}
                    </button>

                    {/* Images */}
                    <Link to={`/admin/product/multipleimage/${productViewData._id}`}>
                      <button
                        className="p-1.5 bg-blue-900/50 text-blue-400 rounded-lg border border-blue-500/20 hover:bg-blue-800/50"
                        title="Images"
                      >
                        <FaImage className="w-4 h-4" />
                      </button>
                    </Link>

                    {/* Edit */}
                    <Link to={`/admin/product/edit/${productViewData._id}`}>
                      <button
                        className="p-1.5 bg-yellow-900/50 text-yellow-400 rounded-lg border border-yellow-500/20 hover:bg-yellow-800/50"
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                    </Link>

                    {/* View */}
                    <button
                      onClick={() => viewProductDetails(productViewData)}
                      className="p-1.5 bg-purple-900/50 text-purple-400 rounded-lg border border-purple-500/20 hover:bg-purple-800/50"
                      title="View"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteProductView(productViewData._id)}
                      className="p-1.5 bg-red-900/50 text-red-400 rounded-lg border border-red-500/20 hover:bg-red-800/50"
                      title="Delete"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  );
}

export default Viewproduct;




function PopUpProduct({productViewData,API_BASE_URL}){


  const {name,slug,short_description,long_description,status,stock,top_selling,other_image,original_price,main_image,final_price,discount_percentage,createdAt,updatedAt,category_id}=productViewData
  
  return (
   <>
<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 py-12">
  {/* Product Details Card */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Admin Header with ID and status information */}
    <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
      <div className="bg-gray-900/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap items-center gap-3">

        <span className="text-xs font-medium text-gray-400">
          SLUG: {slug}
        </span>
        <span className="bg-green-900/50 text-green-400 text-xs px-3 py-1 rounded-full font-medium border border-green-500/20">
          Status:{status==true ? "Active":"Inactive"}
        </span>
        <span className="bg-amber-900/50 text-amber-400 text-xs px-3 py-1 rounded-full font-medium border border-amber-500/20">



          Top Selling:{top_selling==true ? "TopSell":"NotTopSell"}
        </span>
      </div>
      <div className="text-xs text-gray-400">
        <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
        <span className="mx-2">|</span>
        <span>Updated: {new Date(updatedAt).toLocaleDateString()}</span>
      </div>
      </div>
    </div>



   {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="p-6">
              <div className="relative group">
                <img
                  src={API_BASE_URL + `/images/products/${main_image}`}
                  alt="Product Main Image"
                  className="w-full h-96 object-cover rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

       
        <div className="grid grid-cols-4 gap-4 mt-6">
                {other_image.map((image, index) => (
                  <img
                    key={index}
                    src={API_BASE_URL + `/images/products/${image}`}
                    alt="Product thumbnail"
                    className="w-full h-24 object-cover rounded-lg border-2 border-blue-500/30 hover:border-blue-500 transition-colors duration-200 cursor-pointer"
                  />
                ))}
              </div>
            </div>
     {/* Right Column - Product Details */}
     <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-900/50 text-blue-400 text-xs px-3 py-1 rounded-full font-medium border border-blue-500/20">
                    {category_id.CategoryName}
                  </span>
                  <span className="text-xs text-gray-500">ID: {category_id._id}</span>
                </div>

                <h1 className="text-4xl text-left font-bold text-white mb-4 leading-tight">
                  {name}
                </h1>
          <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-400">${final_price}</span>
                    <span className="text-lg text-gray-500 line-through">${original_price}</span>
                  </div>
                  <span className="bg-red-900/50 text-red-400 px-3 py-1 rounded-full text-sm font-semibold border border-red-500/20">
                    {discount_percentage}% OFF
                  </span>
                </div>
        
          <div className="flex items-center mb-6">
                  <span className="text-sm mr-4">Colors:</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-black rounded-full border-2 border-gray-700 ring-2 ring-gray-600 cursor-pointer hover:ring-blue-500 transition-all duration-200" />
                    <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200" />
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200" />
                  </div>
                </div>

          <div className="mb-6">
                  <span className="text-sm font-medium text-gray-300">
                    Availability: {stock ? "In Stock" : "Out of Stock"}
                  </span>
                  <span className="ml-2 text-sm text-green-400">
                    (24 units)
                  </span>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">
                    Short Description:
                  </h3>
                  <p className="text-gray-400">
                    {short_description}
                  </p>
                </div>
              </div>


      


      </div>
    </div>


    <div className="border-t border-gray-700/50 px-6 py-8">
              <h3 className="text-xl font-medium text-white mb-4">
                Long Description
              </h3>
               
             <div
            className="text-sm text-gray-100"
            dangerouslySetInnerHTML={{ __html: long_description || "" }}
          />

              
            </div>



  </div>
</div>

   

   </>
)

}