import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../../../Context/Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  FaPlus, 
  FaPalette, 
  FaEdit, 
  FaTrashAlt, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaList 
} from 'react-icons/fa';
import { useSelector } from 'react-redux';

function ViewColor() {
  
  const { toastMsg, fetchAllColor, AllColor, API_BASE_URL, Color_URL } = useContext(MainContext);
  
   const admin = useSelector((state) => state.admin);

  const statusUpdated = (id) => {
    axios.patch(API_BASE_URL + Color_URL + `/status-update/${id}`, null, {
      headers: {
        Authorization:  `Bearer ${admin.token}` 
      },
    })
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status == true) {
          fetchAllColor();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteView = (id) => {
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
        axios.delete(API_BASE_URL + Color_URL + `/delete/${id}`, {
            headers: {
                 Authorization: `Bearer ${admin.token}`
          },
      })
          .then((success) => {
            toastMsg(success.data.msg, success.data.status);
            if (success.data.status == true) {
              fetchAllColor();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    fetchAllColor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6  bg-gradient-to-br  from-slate-900 to-slate-800 ">
   
      <div className="mb-6  bg-slate-800/50 p-6 rounded-2xl backdrop-blur-lg border border-slate-700/50 fade-in">
        <div className="flex justify-between items-center ">
          <div className="flex items-center space-x-3  ">
            <FaList className="text-2xl text-indigo-500" />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Color Management</h2>
              <p className="text-gray-400">Manage your product colors</p>
            </div>
          </div>
          <Link to="add">
            <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 group">
              <FaPlus className="mr-2 group-hover:rotate-90 transition-transform duration-200" />
              Add Color
            </button>
          </Link>
        </div>
      </div>

    
      <div className=" bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-lg border border-slate-700/50 overflow-hidden fade-in ">
        <div className="overflow-x-auto max-h-[480px] ">
          <table className="w-full ">
            <thead>
              <tr className=" border-b border-slate-700/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Color Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Slug</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Code</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Preview</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {Array.isArray(AllColor) && AllColor.map((ColorViewData, ColorViewIndex) => (
                <tr key={ColorViewIndex} className="hover:bg-slate-700/30 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <FaPalette className="text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-200">{ColorViewData.ColorName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-400">{ColorViewData.ColorSlug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-200">{ColorViewData.ColorPickerName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div 
                      className="w-8 h-8 rounded-full shadow-md border border-gray-200" 
                      style={{ backgroundColor: ColorViewData.ColorPickerName }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {ColorViewData.ColorStatus ? (
                      <button 
                        onClick={() => statusUpdated(ColorViewData._id)}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200"
                      >
                        <FaCheckCircle className="mr-2 text-green-600" />
                        Active
                      </button>
                    ) : (
                      <button 
                        onClick={() => statusUpdated(ColorViewData._id)}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 hover:bg-red-200 transition-colors duration-200"
                      >
                        <FaTimesCircle className="mr-2 text-red-600" />
                        Inactive
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <Link to={`/admin/color/edit/${ColorViewData._id}`}>
                        <button className="inline-flex items-center px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors duration-200">
                          <FaEdit className="mr-2" />
                          Edit
                        </button>
                      </Link>
                      <button 
                        onClick={() => deleteView(ColorViewData._id)}
                        className="inline-flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
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

export default ViewColor;