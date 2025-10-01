import React from "react";
import AdminHeader from "../Components/AdminHeader";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";

function AdminLayout() {
  return (
    <div className="h-screen flex">
      {/* Fixed Sidebar */}
      <div className="w-1/6 h-full fixed top-0 left-0 bg-white z-20 border-r">
        {/* <AdminSidebar /> */}
        <AdminSidebar/>
      </div>

      {/* Main Content Area */}
      <div className="ml-[16.66%] w-5/6 flex flex-col h-screen">
        {/* Fixed Header */}
        <div className="h-16 fixed top-0 left-[16.66%] right-0 bg-white z-20 border-b">
          <AdminHeader />
        </div>

        {/* Scrollable Outlet */}
        <div className="mt-16 flex-1 overflow-y-auto p-4 bg-gradient-to-br  from-slate-900 to-slate-800 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
