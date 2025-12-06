import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar (){
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path ? "bg-[#e3cd]" : "";
  };

  return (
    <nav className="bg-[#e3ecd9] sticky top-0 z-50 shadow-md border">
      <div className="container mx-auto px-4">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-center items-center h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition duration-300 ${isActive(
                "/"
              )}`}
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className={`px-4 py-2 rounded-md transition duration-300 ${isActive(
                "/gallery"
              )}`}
            >
              Gallery
            </Link>
            <Link
              to="/profile"
              className={`px-4 py-2 rounded-md transition duration-300 ${isActive(
                "/profile"
              )}`}
            >
              Profile
            </Link>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex justify-between items-center h-16">
          <div className="text-xl font-bold">Quarter-Zip</div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${isOpen ? "block" : "hidden"} md:hidden bg-[#e3ecd9]`}
        >
          <Link
            to="/"
            className={`block px-4 py-2 transition duration-300 ${isActive(
              "/"
            )}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className={`block px-4 py-2 transition duration-300 ${isActive(
              "/gallery"
            )}`}
            onClick={() => setIsOpen(false)}
          >
            Gallery
          </Link>
          <Link
            to="/profile"
            className={`block px-4 py-2 transition duration-300 ${isActive(
              "/profile"
            )}`}
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
