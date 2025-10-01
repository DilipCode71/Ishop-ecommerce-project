import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ThankYou = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    navigate("/");
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div
            style={{
                backgroundImage: `url(/thankyoubackground.avif)`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="flex flex-col items-center justify-center min-h-screen p-4"
        >
            <motion.div
                className="text-center bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl max-w-md w-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.div
                    className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.4,
                    }}
                >
                    <svg
                        className="w-8 h-8 text-green-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </motion.div>
                <motion.h1
                    className="text-2xl font-bold text-green-700 mb-4"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Thank You for Your Purchase!
                </motion.h1>
                <motion.p
                    className="text-gray-700 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Your order has been placed successfully.
                </motion.p>
                <motion.p
                    className="text-gray-600 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    Order ID: <span className="text-green-600">{orderId}</span>
                </motion.p>
                <motion.p
                    className="text-gray-700 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    We appreciate your business and hope to see you again soon!
                </motion.p>
                <motion.p
                    className="text-sm text-gray-500 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    Redirecting to homepage in <span className="font-semibold">{countdown}</span>...
                </motion.p>
            </motion.div>
        </div>
    );
};

export default ThankYou;