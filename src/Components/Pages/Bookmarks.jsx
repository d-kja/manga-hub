import React from "react";
import { motion } from "framer-motion";

function Bookmarks() {
    return (
        <motion.div
            initial={{ y: 75, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                ease: "easeIn",
                delay: 0.3,
            }}
            className="lg:max-w-screen-2xl relative mx-auto"
        >
            <div className="my-12">TODO &rarr; OAuth + user functions</div>;
        </motion.div>
    );
}

export default Bookmarks;
