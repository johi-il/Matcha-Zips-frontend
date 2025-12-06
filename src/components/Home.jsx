import React from "react";
import Navbar from "./Navbar"; // Import your Navbar component

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-[#2D5016]">
              Quarter zips, matcha vibes only
            </h1>

            {/* Subheading */}
            <p className="font-sans text-lg md:text-xl text-gray-700 max-w-md">
              Double-tap your favorite looks, save inspo, and spill some matcha.
              Discover trending quarter zips or share your own style—Pinterest
              energy, TikTok flair.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Explore
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
                Share
              </button>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="relative">
            {/* This is where your image would go */}
            <div className="aspect-square bg-gray-200 rounded-lg shadow-lg">
              {/* Replace with your actual image */}
              <img
                src="https://cdn.pixabay.com/photo/2021/11/12/13/14/sweater-6788998_1280.jpg"
                alt="Quarter zip fashion"
                className="w-full h-full object-cover rounded-lg"
              /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
