import React from "react";

function Preloader() {
  return (
    <div className="fixed top-0 left-0 w-full  h-full  bg-white flex items-center justify-center z-[9999]">
      <img
        src="/logo.png" 
        alt="Logo"
        className="w-24 h-24 animate-pulse"
      />
    </div>
  );
}

export default Preloader;
