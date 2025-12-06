import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-[#2D5016]">
              Quarter zips, matcha vibes only
            </h1>
            <p className="font-sans text-lg md:text-xl text-gray-700 max-w-md">
              Tap your favorite looks, save inspo, and spill some matcha.
              Discover trending quarter zips or share your own style—Pinterest
              energy, TikTok flair.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/gallery">
                <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                  Explore
                </button>
              </Link>

              <Link
              to="/profile">
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
                view profile
              </button>
              
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-200 rounded-lg shadow-lg">
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
