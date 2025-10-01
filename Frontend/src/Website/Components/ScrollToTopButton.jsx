import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; 
import clsx from "clsx";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        "fixed bottom-5 right-5 z-50 p-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer",
        visible ? "bg-red-600 hover:bg-blue-700 text-white" : "opacity-0 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTopButton;
