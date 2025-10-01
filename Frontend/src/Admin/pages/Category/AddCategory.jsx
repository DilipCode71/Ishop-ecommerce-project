import React, { useContext, useRef } from 'react'
import axios from 'axios';
import { MainContext } from '../../../Context/Context';
import { useSelector } from 'react-redux';

function AddCategory() {

  const {toastMsg,API_BASE_URL,Category_URL}=useContext(MainContext);

  const CategoryName=useRef()
  const CategorySlug=useRef()
  const CategoryImageName=useRef()


  const admin= useSelector((state)=>state.admin)


  const createSlug = ()=> {

    CategorySlug.current.value=CategoryName.current.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }


  
  const AddSubmit=(event)=>{
     event.preventDefault()


     const formdata=new FormData();

     formdata.append("CategoryName",CategoryName.current.value);
     formdata.append("CategorySlug",CategorySlug.current.value);
     formdata.append("CategoryImageName",CategoryImageName.current.files[0]);


     if (!CategoryName.current.value || !CategorySlug.current.value || !CategoryImageName.current.files[0]) {
  toastMsg("All fields are required", 0);
  return;
}

     axios.post(API_BASE_URL+Category_URL+"/create",formdata,
     {
      headers:{
        Authorization: `Bearer ${admin.token}`
      }
     }

     )
     .then(
      (success)=>{
        toastMsg(success.data.msg,success.data.status)
      
         if(success.data.status==1){
          event.target.reset()
         } 
      }
     ).catch(
      (error)=>{
        console.log(error);
      }
     )

  }



  return (
    <>
     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Add New Category
          </h2>
          
          <form className="space-y-6" onSubmit={AddSubmit}>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Category Name
              </label>
              <input
                onChange={createSlug}
                type="text"
                id="name"
                ref={CategoryName}
                name="CategoryName"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white/50 transition-all"
                placeholder="Enter category name"
              
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Slug
              </label>
              <input
                readOnly
                type="text"
                id="slug"
                ref={CategorySlug}
                name="CategorySlug"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none text-white/70"
                placeholder="auto-generated-slug"
              
              />
              <p className="mt-2 text-sm text-white/60">
                This will be automatically generated from the category name
              </p>
            </div>

          <div>
           

<label className="block text-sm font-medium text-white">Category Image</label>
      <input
        type="file"
        ref={CategoryImageName}
        name='CategoryImageName'
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100  border rounded-md  "
      />
          </div>

          <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Add Category
              </button>
            </div>
        </form>
      </div>
      </div>
      </div>
      
            </>
  )
}

export default AddCategory