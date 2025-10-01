import axios from 'axios';
import React, { createContext,  useState } from 'react'
import { useSelector } from 'react-redux';
// import toast, { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const MainContext=createContext()


function Context({children}) {
  const admin= useSelector((state)=> state.admin)
  const API_BASE_URL=import.meta.env.VITE_API_URL;
  const Category_URL="/category";  
  const Color_URL="/color";  
  const Product_URL="/product" 
  const Admin_URL="/admin" 
  const User_URL="/user" 
  const [AllCategory,setAllCategory]=useState([]); 
  const [AllColor,setAllColor]=useState([]); 
  const [AllProduct,setAllProduct]=useState([]) 



  

     
    // const toastMsg = (msg, status) => toast(msg, { type: status==true ? 'success' : 'error' });

    const toastMsg = (msg, status) => {
      // status ko  boolean से string changes 
            const toastType = status ? 'success' : 'error'; 
      
      toast(msg, { type: toastType });
    };
    





    

   const fetchAllCategory = (category_id = null) => {

    let categoryUrlApi = API_BASE_URL + Category_URL;

    if (category_id) {
        categoryUrlApi += `/${category_id}`;
    }


    axios.get(categoryUrlApi,
 {
        headers: {
            Authorization:  `Bearer ${admin.token}`
        }
    }
)
    .then((success) => {

      if (category_id) {
      
        setAllCategory(success.data.category); 
      } else {
        const sortedCategory = success.data.category.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setAllCategory(sortedCategory);
      }
    })
    .catch((error) => {
        console.log(error);
    });
}



      const fetchAllColor=(color_id=null)=>{
        let colorApiUrl=API_BASE_URL+Color_URL
        if(color_id){
            colorApiUrl+=`/${color_id}`;
        }

        axios.get(colorApiUrl,
          {
        headers: {
            Authorization:  `Bearer ${admin.token}`
        }
    }
        ).then(
            (success)=>{
                setAllColor(success.data.colorGet);
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        )

      }

  

    const fetchAllProduct=(product_id=null,limit=0, CategorySlug=null,productColor=null )=>{

      let productApiUrl=API_BASE_URL+Product_URL
      if(product_id){
        productApiUrl+=`/${product_id}`;
      }

      const query=new URLSearchParams();
      query.append("limit",limit)
      query.append("CategorySlug",CategorySlug)
      query.append("productColor",productColor)

      axios.get(productApiUrl + "?" + query,{
        headers:{
          Authorization: `Bearer ${admin.token}`
        }
      }).then(
          (success)=>{
            setAllProduct(success.data.product);
          }
      ).catch(
          (error)=>{
              console.log(error);
            
          }
      )
    }
    

  return (

    <MainContext.Provider value={{toastMsg,fetchAllCategory,fetchAllColor,fetchAllProduct, AllCategory,AllColor, AllProduct,
    API_BASE_URL,Category_URL,Color_URL ,Product_URL,Admin_URL,User_URL}}>

     {children}
     <ToastContainer position="top-right" autoClose={1000} theme="light" />
    </MainContext.Provider>
  )
}

export default Context