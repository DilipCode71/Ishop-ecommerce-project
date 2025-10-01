

import React, { useContext, useState } from 'react';
import { MainContext } from '../../../Context/Context';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function MultipleImage() {
  const { toastMsg, API_BASE_URL, Product_URL } = useContext(MainContext);
  const { product_id } = useParams();

const admin = useSelector((state) => state.admin);

  const [imagePreview, setImagePreview] = useState([]);

  const handlePreview = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const multipleImageSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (let image of event.target.other_image.files) {
      formData.append('other_image', image);
    }

    axios
      .post(API_BASE_URL + Product_URL + '/multipleimage/' + product_id, formData,{
        headers:{
          Authorization: `Bearer ${admin.token}`
        }
      })
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status === true) {
          event.target.reset();
          setImagePreview([]); // Clear preview
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="py-10 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white border border-gray-300 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Upload Product Images
          </h2>

          <form className="space-y-6" onSubmit={multipleImageSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <input
                type="file"
                multiple
                name="other_image"
                accept="image/*"
                onChange={handlePreview}
                required
                className="block w-full text-sm text-gray-700 bg-white
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700
                  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Image Preview */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {imagePreview.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Preview"
                  className="w-full h-32 object-contain rounded-lg border border-gray-300"
                />
              ))}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-2 px-4 rounded-md font-semibold transition"
              >
                Upload Images
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
