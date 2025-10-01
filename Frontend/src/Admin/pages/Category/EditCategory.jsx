import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { MainContext } from "../../../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Type, Tag, Image, Save } from "lucide-react";
import { useSelector } from "react-redux";

function EditCategory() {
  const {
    toastMsg,
    API_BASE_URL,
    Category_URL,
    AllCategory,
    fetchAllCategory,
  } = useContext(MainContext);
  const CategoryName = useRef();
  const CategorySlug = useRef();
  const CategoryImageName = useRef();
  const { category_id } = useParams();
  const navigate = useNavigate();
  const admin=useSelector((state)=>state.admin)


  useEffect(() => {
    fetchAllCategory(category_id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createSlug = () => {
    CategorySlug.current.value = CategoryName.current.value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  const editSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("CategoryName", CategoryName.current.value);
    formdata.append("CategorySlug", CategorySlug.current.value);
    formdata.append(
      "CategoryImageName",
      CategoryImageName.current.files[0] ?? null
    );

    axios
      .put(API_BASE_URL + Category_URL + "/edit/" + category_id, formdata,
        {
          headers:{
            Authorization:`Bearer ${admin.token}`
          }
        }
      )
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          event.target.reset();
          navigate("/admin/category");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20">
         
          <div className="px-6 py-4 bg-gradient-to-br from-slate-900 to-slate-800 border-b border-emerald-800/20">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              Edit Category
            </h2>
          </div>




         
          <form className="p-6 space-y-6" onSubmit={editSubmit}>
           
            <div className="group">
              <label className="flex items-center text-sm font-medium text-white mb-2">
                <Type className="w-4 h-4 mr-2 text-emerald-500" />
                Category Name
              </label>
              <input
                type="text"
                ref={CategoryName}
                onChange={createSlug}
                defaultValue={AllCategory.CategoryName}
                name="CategoryName"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white/50 transition-all"
                placeholder="Enter category name"
                required
              />
            </div>

      
         

               <div>
              <label className="flex items-center text-sm font-medium text-white mb-2">
                <Tag className="w-4 h-4 mr-2 text-emerald-500" />
                Slug
              </label>
              <input
                readOnly
                type="text"
                id="slug"
                ref={CategorySlug}
                 defaultValue={AllCategory.CategorySlug}
                name="CategorySlug"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none text-white/70"
                placeholder="auto-generated-slug"
                required
              />
              <p className="mt-2 text-sm text-white/60">
                This will be automatically generated from the category name
              </p>
            </div>
     
            <div>
              <label className="flex items-center text-sm font-medium text-white mb-2">
                <Image className="w-4 h-4 mr-2 text-emerald-500" />
                Category Image
              </label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 transition-all duration-200 hover:border-emerald-400">
                <div className="text-center">
                  <input
                    id="file-upload"
                    name="CategoryImageName"
                    
                    type="file"
                    ref={CategoryImageName}
                    className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100  border rounded-md"
                   
                  />
                </div>
              </div>
            </div>
           
           
            {AllCategory.CategoryImageName && (
              <div className="flex items-center space-x-4 p-4 bg-[#2d3441] rounded-lg">
                <img
                  src={`${API_BASE_URL}/images/category/${AllCategory.CategoryImageName}`}
                  alt="Current category image"
                  className="w-20 h-20 object-cover rounded-lg shadow-sm ring-1 ring-gray-200"
                />
                <span className="text-white font-medium">Current image</span>
              </div>
            )}
           
        
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 text-sm font-semibold text-white  bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform transition-all duration-200 hover:shadow-lg cursor-pointer"
            >
              <Save className="w-4 h-4 mr-2" />
              Update Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;
