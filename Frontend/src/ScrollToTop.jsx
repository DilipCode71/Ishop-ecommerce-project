import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Agar URL mein '/product' hai toh scroll mat karo
    if (!location.pathname.includes("/product")) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
}

export default ScrollToTop;
