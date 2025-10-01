import React, { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { MainContext } from '../../../Context/Context';
import { useNavigate, useParams } from 'react-router-dom';

import { Edit, Tag, Palette, Save, Info } from 'lucide-react';
import { useSelector } from 'react-redux';

function EditColor() {
  const { toastMsg, fetchAllColor, AllColor, API_BASE_URL, Color_URL } = useContext(MainContext);
  const ColorName = useRef();
  const ColorSlug = useRef();
  const ColorPickerName = useRef();
  const { color_id } = useParams();
  const navigate = useNavigate();

  const admin=useSelector((state)=>state.admin)

  useEffect(() => {
    fetchAllColor(color_id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createSlug = () => {
    ColorSlug.current.value = ColorName.current.value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  };

  const EditColorSubmit = (event) => {
    event.preventDefault();

    const formdata = {
      ColorName: ColorName.current.value,
      ColorSlug: ColorSlug.current.value,
      ColorPickerName: ColorPickerName.current.value
    };

    axios.put(API_BASE_URL + Color_URL + "/edit/" + color_id, formdata,
      {
        headers:{
          Authorization: `Bearer ${admin.token}`
        }
      }
    )
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          event.target.reset();
          navigate("/admin/color");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800  p-6">
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
       
        <div className="px-6 py-4 bg-gradient-to-br from-slate-900 to-slate-800  ">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Edit className="w-5 h-5 mr-2 stroke-[2]" />
            Edit Color
          </h2>
        </div>

   
        <form className="p-8 space-y-6" onSubmit={EditColorSubmit}>
       
          <div className="group">
            <label className="flex items-center text-sm font-medium text-white mb-2">
              <Palette className="w-4 h-4 mr-2 text-violet-500" />
              Color Name
            </label>
            <input
              type="text"
              ref={ColorName}
              onChange={createSlug}
              defaultValue={AllColor.ColorName}
              name="ColorName"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white/50 transition-all"
              placeholder="Enter color name"
              required
            />
          </div>
   
       <div>
              <label className="flex items-center text-sm font-medium text-white mb-2">
                <Tag className="w-4 h-4 mr-2 text-violet-500" />
                Color Slug
              </label>
              <input
                type="text"
                ref={ColorSlug}
                readOnly
                defaultValue={AllColor.ColorSlug}
                name="ColorSlug"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none text-white/70"
                placeholder="auto-generated-slug"
                required
              />
              <div className="mt-2 flex items-center text-sm text-white/60  p-2 rounded-lg">
                <Info className="w-4 h-4 mr-2 text-violet-500" />
                Automatically generated from the color name
              </div>
            </div>

          
            <div>
              <label className="flex items-center text-sm font-medium text-white mb-2">
                <Palette className="w-4 h-4 mr-2 text-violet-500" />
                Color Preview
              </label>
              <div className="flex space-x-4 bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl ">
                <input
                  type="color"
                  ref={ColorPickerName}
                  defaultValue={AllColor.ColorPickerName}
                  name="ColorPickerName"
                  className="h-14 w-28 rounded-xl  p-1 cursor-pointer  shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
                <div className="flex-1 rounded-xl shadow-inner p-2">
                  <div 
                    className="w-full h-10 rounded-lg shadow-sm transition-all duration-200"
                    style={{ backgroundColor: ColorPickerName.current?.value || AllColor.ColorPickerName }}
                  />
                </div>
              </div>
            </div>



            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl  focus:outline-none cursor-pointer"
            >
              <Save className="w-4 h-4 mr-2" />
              Update Color
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditColor;