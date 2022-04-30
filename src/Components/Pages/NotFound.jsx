import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function NotFound() {
    return (
        <div
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
        </div>
    );
}

export default NotFound;
