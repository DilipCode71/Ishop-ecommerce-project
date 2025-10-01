import {
  FaBolt,
  FaTh,
  FaPalette,
  FaBox,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaSearch,
  FaBell,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from "react";
import { login, logout } from "../../Redux/reducer/AdminSlice";
import { MainContext } from "../../Context/Context";

function AdminSidebar() {


  const {toastMsg}=useContext(MainContext)



  const navMenu = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <FaTh className="h-5 w-5" />
    },
    {
      path: "/admin/category",
      name: "Category",
      icon: <FaBox className="h-5 w-5" />
    },
    {
      path: "/admin/color",
      name: "Color",
      icon: <FaPalette className="h-5 w-5" />
    },
    {
      path: "/admin/product",
      name: "Products",
      icon: <FaBox className="h-5 w-5" />
    },
    {
      path: "/admin/analytics",
      name: "analytics",
      icon:  <FaChartBar className="h-5 w-5" />
    },
    {
      path: "/admin/setting",
      name: "setting",
      icon:   <FaCog className="h-5 w-5" />
    }
  ];

  const admin = useSelector((state) => state.admin.data);
  const navigate = useNavigate();
 const dispatch=useDispatch()

  const localstorageData=JSON.parse(localStorage.getItem("adminLogin"));
  const localstorageToken=localStorage.getItem("adminToken");

  useEffect(
    () => {
      if(!admin && !localstorageData){
        navigate("/admin/login")
      }else{
        dispatch(login({data:localstorageData ,token:localstorageToken}));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  );

  



  const logOutBtn=()=>{
    dispatch(logout())
    navigate("/admin/login");
    toastMsg("Logout successfully",0)      
  }

  return (
    <div className="min-h-screen flex bg-gray-950">
      <div className="sidebar-gradient text-white w-[280px] space-y-6 py-7 px-4 fixed inset-y-0 left-0 transform transition-all duration-300 ease-in-out md:relative md:translate-x-0 z-30 border-r border-gray-700/50">
        {/* Logo */}
        <div className="flex items-center space-x-3 px-2 mb-8">
          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg pulse-hover">
            <FaBolt className="h-7 w-7 text-white" />
          </div>
          <div className="fade-in">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
             Ishop Admin
            </h1>
            {/* <p className="text-sm text-gray-400">Management Console</p> */}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1.5">
          {navMenu.map((navItem, navIndex) => (
            <Link
              key={navIndex}
              to={navItem.path}
              className="flex items-center space-x-3 px-4 py-3.5 text-gray-300 hover:bg-white/10 rounded-xl transition-all duration-200 nav-item-hover group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800/50 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors duration-200">
                {navItem.icon}
              </div>
              <span className="font-medium">{navItem.name}</span>
            </Link>
          ))}

        
          {/* <Link
            to="/admin/settings"
            className="flex items-center space-x-3 px-4 py-3.5 text-gray-300 hover:bg-white/10 rounded-xl transition-all duration-200 nav-item-hover group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800/50 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors duration-200">
              <FaCog className="h-5 w-5" />
            </div>
            <span className="font-medium">Settings</span>
          </Link> */}

          <div className="border-t border-gray-700/50 pt-4 mt-4">
            <button
            onClick={logOutBtn}
              className="w-full cursor-pointer flex items-center space-x-3 px-4 py-3.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 nav-item-hover group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-200">
                <FaSignOutAlt className="h-5 w-5" />
              </div>
              <span className="font-medium ">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default AdminSidebar;