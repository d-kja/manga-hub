import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import { motion } from "framer-motion";

function NotFound() {
    return (
        <motion.div
            initial={{ x: 75, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                ease: "easeIn",
            }}
            className="hero mt-50"
            style={{
                minHeight: 750,
            }}
        >
            <div className="text-center hero-content">
                <div className="max-w-lg">
                    <p className="text-5xl mb-8">404 - Page Not Found</p>
                    <Link className="btn btn-lg" to="/">
                        <FaHome className="mr-2" /> BACK TO HOME
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export default NotFound;
