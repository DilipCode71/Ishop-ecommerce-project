import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import {  Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { useDispatch } from "react-redux";
import { lsGetData } from "../Redux/reducer/CartSlice";
import ScrollToTop from "../ScrollToTop";
import { login } from "../Redux/reducer/UserSlice";
import Preloader from "./Pages/Preloader";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import WhatsAppButton from "./Components/WhatsAppButton";
import Chatbot from "./Components/Chatbot";

function Website() {
  const dispatch = useDispatch();
   const [loading, setLoading] = useState(true); 


useEffect(
  ()=>{

    const localstorageData=JSON.parse(localStorage.getItem("userLogin"));
    const localstorageToken=localStorage.getItem("userToken");
    if(localstorageData){
      dispatch(login({data:localstorageData,token:localstorageToken}))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]
)
  
  useEffect(() => {
    dispatch(lsGetData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


 
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;


  return (
    <div>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
    <ScrollToTopButton/>
    <WhatsAppButton/>
    <Chatbot/>
    </div>

  );
}

export default Website;
