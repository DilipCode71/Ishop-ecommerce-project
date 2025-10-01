import React, { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

const CustomVideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]  overflow-hidden mb-5 bg-white shadow rounded-xl ">
      <video
        ref={videoRef}
        src={src}
        muted
        poster={poster}
        className="w-full h-full object-cover rounded-xl"
        controls={isPlaying}
      />
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 
                   rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-10 cursor-pointer"
        >
          <FaPlay className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
