import axios from "axios";
import React, { useContext, useRef } from "react";
import { MainContext } from "../../../Context/Context";
import { useSelector } from "react-redux";

function AddColor() {
  const admin = useSelector((state) => state.admin);

  const { toastMsg,API_BASE_URL ,Color_URL} = useContext(MainContext);

  const ColorName = useRef();
  const ColorSlug = useRef();
  const ColorPickerName = useRef();

  const createSlug = () => {
    ColorSlug.current.value = ColorName.current.value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  const addColorSubmit = (event) => {
    event.preventDefault();

    const formdata = {
      ColorName: ColorName.current.value,
      ColorSlug: ColorSlug.current.value,
      ColorPickerName: ColorPickerName.current.value,
    };

    axios
      .post(API_BASE_URL + Color_URL + `/create` ,formdata, 
        {
        headers: {
          Authorization:  `Bearer ${admin.token}`
        },
      })
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          event.target.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="py-10 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Add New Color
            </h2>

            <form className="space-y-6" onSubmit={addColorSubmit}>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Color Name
                </label>
                <input
                  onChange={createSlug}
                  type="text"
                  id="name"
                  ref={ColorName}
                  name="ColorName"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white/50 transition-all"
                  placeholder="Enter color name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Color Slug
                </label>
                <input
                  readOnly
                  type="text"
                  id="slug"
                  ref={ColorSlug}
                  name="ColorSlug"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none text-white/70"
                  placeholder="auto-generated-slug"
                />
                <p className="mt-2 text-sm text-white/60">
                  This will be automatically generated from the color name
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Pick a Color
                </label>
                <input
                  type="color"
                  ref={ColorPickerName}
                  name="ColorPickerName"
                  className="w-full h-12 rounded-md "
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
                >
                  Add Color
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddColor;
