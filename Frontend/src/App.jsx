import React from 'react'
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom"
import Website from './Website/WebsiteLayout'
import AdminLayout from './Admin/pages/AdminLayout'
import Dashboard from './Admin/pages/Dashboard'
import ViewCategory from './Admin/pages/Category/ViewCategory'
import AddCategory from './Admin/pages/Category/AddCategory'
import AddColor from './Admin/pages/Color/AddColor'
import ViewColor from './Admin/pages/Color/ViewColor'
import Viewproduct from './Admin/pages/Products/Viewproduct'
import AddProduct from './Admin/pages/Products/AddProduct'
import Context from './Context/Context'
import EditCategory from './Admin/pages/Category/EditCategory'
import EditColor from './Admin/pages/Color/EditColor'
import MultipleImage from './Admin/pages/Products/Multipleimage'
import EditProduct from './Admin/pages/Products/EditProduct'
import AnalyticsView from './Admin/pages/Analytics/AnalyticsView'
import AdminLogin from './Admin/pages/AdminLogin'
import Setting from './Admin/pages/Settings/Setting'
import Home from './Website/Pages/Home'
import About from './Website/Pages/About'
import Products from './Website/Pages/Products'
import Contact from './Website/Pages/Contact'
import Cart from './Website/Pages/Cart'
import UserLoginForm from './Website/Auth/UserLoginForm'
import UserRegisterForm from './Website/Auth/UserRegisterForm'
import SingleProduct from './Website/Pages/SingleProduct'
import CheckOut from './Website/Pages/CheckOut'
import AddAddress from './Website/Pages/AddAddress'
import Thankyou from './Website/Pages/Thankyou'
import ProfileSection from './Website/Pages/Profile'
import OrderSuccess from './Website/Pages/OrderSuccess'
import AdminRegister from './Admin/pages/AdminRegister'


function App() {

const routers=createBrowserRouter(
  [
    {
      path:"/",
      element:<Website/>,
      children:[

        {
            path:"/",
            element:<Home/>   
        },
        {
          path:"/about",
          element:<About/>
        },
        {
          path:"/product/:CategorySlug?",
          element:<Products/>
        },
        {
          path:"/single-Product/:ProductsId",
          element:<SingleProduct/>
        },
        {
          path:"/contact",
          element:<Contact/>
        },
        {
          path:"/cart",
          element:<Cart/>
        },
        {
          path:"/checkout",
          element:<CheckOut/>
        },
        {
          path:"/checkout/addAddress",
          element:<AddAddress/>
        },
        {
          path:"/thankyou/:orderId",
          element:<Thankyou/>
        },
        
        {
          path:"/order-Success/:id",
          element:<OrderSuccess/>
        },
        {
          path:"/profile",
          element:<ProfileSection/>
        },             
      ]
      
    },

    {
      path:"login",
      element:<UserLoginForm/>
    },
    {
      path:"register",
      element:<UserRegisterForm/>
    },

   

    {
      path:"/admin",
      element:<AdminLayout/>,
      children:[
        {
          path:"",
          element:<Dashboard/>

        },
        {
          path:"category",
          element:<ViewCategory/>
        },
        {
          path:"category/add",
          element:<AddCategory/>
        },
        {
          path:"category/edit/:category_id",
          element:<EditCategory/>
        },
        {
          path:"color",
          element:<ViewColor/>
        },
        {
          path:"color/add",
          element:<AddColor/>
        },
        {
          path:"color/edit/:color_id",
          element:<EditColor/>
        },
        {
          path:"product",
          element:<Viewproduct/>
        },
        {
          path:"product/add",
          element:<AddProduct/>
        },
        {
          path:"product/multipleimage/:product_id",
          element:<MultipleImage/>
        },
        {
          path:"product/edit/:product_id",
          element:<EditProduct/>
        },
        {
          path:"analytics",
          element:<AnalyticsView/>
        },
        {
          path:"setting",
          element:<Setting/>
        }


      ]
     
    },

    {
      path:"/admin/login",
      element:<AdminLogin/>
    },
    {
      path:"/admin/register",
      element:<AdminRegister/>
    }
  ]
)

  return (

    <Context>

      <RouterProvider router={routers} />
      
    </Context>
  )
}

export default App