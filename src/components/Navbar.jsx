import React from 'react'




import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-brown-800 bg-[#c5d751] sticky top-0 z-50 shadow-md ">
      <div className="container mx-auto px-4">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-center items-center h-16">
          <div className="flex space-x-8">
            <a
              href="#"
              className="hover:bg-[#1d803d] px-4 py-2 rounded-md transition duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="hover:bg-[#1d803d] px-4 py-2 rounded-md transition duration-300"
            >
              Gallery
            </a>
            <a
              href="#"
              className="hover:bg-[#1d803d] px-4 py-2 rounded-md transition duration-300"
            >
              Profile
            </a>
          </div>
        </div>

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


      </div>
    </nav>
  );
};

export default Navbar;
