import React, { useContext, useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { FaBoxOpen, FaLock } from "react-icons/fa";
import { MainContext } from '../../Context/Context';

function AllCategorySearchbar() {
  const { fetchAllCategory, AllCategory } = useContext(MainContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllCategory();
      setLoading(false);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-[1500px] mx-auto rounded-2xl bg-teal-500 px-5 py-3 ">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Search Section */}
        <div className="flex w-full md:max-w-[590px] bg-white p-2 rounded-2xl items-center transition-all duration-300">
          <select
            className="rounded-lg outline-none mr-2 font-semibold text-sm bg-white px-3 py-1 border border-gray-300 focus:border-teal-600"
          >
            <option value="AllCATEGORY">All CATEGORY</option>
            {
              !loading && Array.isArray(AllCategory) &&
              AllCategory.slice(0, 3).map((catData, index) => (
                <option key={index} value={catData.CategoryName}>
                  {catData.CategoryName}
                </option>
              ))
            }
          </select>

          <div className="relative w-full min-w-[180px] sm:min-w-[300px]">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-2 outline-none text-sm font-medium"
              placeholder="Search products..."
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
          </div>
        </div>

        <div className=" hidden lg:flex flex-wrap justify-center  md:justify-end gap-4 text-white text-sm md:text-base font-sans">
          <p className="flex items-center gap-1">
            <FaBoxOpen className="text-blue-600" />
            FREE SHIPPING OVER $199
          </p>
          <p className="flex items-center gap-1">
            30 DAYS MONEY BACK
          </p>
          <p className="flex items-center gap-1">
            <FaLock className="text-green-600" />
            100% SECURE PAYMENT
          </p>
        </div>

      </div>
    </div>
  );
}

export default AllCategorySearchbar;
