import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../../Context/Context";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import {
  FaEdit,
  FaTrashAlt,
  FaCheckCircle,
  FaRegTimesCircle,
  FaPlus,
  FaList,
  FaSearch,
} from "react-icons/fa";

function ViewCategory() {

  const admin = useSelector((state) => state.admin);



  const {
    toastMsg,
    fetchAllCategory,
    AllCategory,
    API_BASE_URL,
    Category_URL,
  } = useContext(MainContext);



 const UpdateStatus = (id) => {
 
  axios
    .patch(API_BASE_URL + Category_URL + `/status-update/${id}`, null, {
      headers: {
        Authorization:  `Bearer ${admin.token}`  
      },
    })
    .then((success) => {
      toastMsg(success.data.msg, success.data.status);
      if (success.data.status == 1) {
        fetchAllCategory();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};


  const deleteCategoryView = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
            .delete(`${API_BASE_URL}${Category_URL}/delete/${id}`, {
            headers: {
                 Authorization:  `Bearer ${admin.token}`
          },
      })
          .then((success) => {
            toastMsg(success.data.msg, success.data.status);
            if (success.data.status == 1) {
              fetchAllCategory();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    fetchAllCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br  from-slate-900 to-slate-800 min-h-screen">
      <div className="mb-8 bg-slate-800/50 p-6 rounded-2xl backdrop-blur-lg border border-slate-700/50 fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <FaList className="text-2xl text-indigo-500" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Category Management
              </h2>
            </div>
            <p className="text-gray-400">
              Manage and organize your product categories
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Link to="add">
              <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 group">
                <FaPlus className="mr-2 group-hover:rotate-90 transition-transform duration-200" />
                Add Category
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-lg border border-slate-700/50 overflow-hidden fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  S.Nu
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Category Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Slug
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {Array.isArray(AllCategory) &&
                AllCategory.map((category, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-700/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-200">
                        {category.CategoryName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-400">
                        {category.CategorySlug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={
                          API_BASE_URL +
                          `/images/category/${category.CategoryImageName}`
                        }
                        alt={category.CategoryName}
                        className="h-12 w-12 rounded-xl object-cover shadow-lg hover:scale-110 transition-transform duration-200"
                      />
                    </td>
                    <td className="px-6 py-4">
                      {category.CategoryStatus ? (
                        <button
                          onClick={() => UpdateStatus(category._id)}
                          className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors duration-200"
                        >
                          <FaCheckCircle className="mr-2" />
                          Active
                        </button>
                      ) : (
                        <button
                          onClick={() => UpdateStatus(category._id)}
                          className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors duration-200"
                        >
                          <FaRegTimesCircle className="mr-2" />
                          Inactive
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <Link
                          to={`/admin/category/edit/${category._id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-emerald-500/80 text-white rounded-lg hover:bg-emerald-600 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25"
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteCategoryView(category._id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                        >
                          <FaTrashAlt className="mr-2" />
                          Delete
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
  );
}

export default ViewCategory;
