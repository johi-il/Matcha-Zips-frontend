import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import OutfitForm from "./OutfitForm";
import User from "./User";

function Profile() {
  // State for saved outfits
  const [savedOutfits, setSavedOutfits] = useState({});

  // Load saved outfits from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedOutfits");
    if (saved) {
      setSavedOutfits(JSON.parse(saved));
    }
  }, []);

  // Handle toggle save from Card component
  const handleToggleSave = (newSavedOutfits) => {
    setSavedOutfits(newSavedOutfits);
  };

  // Remove an outfit from saved outfits
  const removeOutfit = (outfitId) => {
    const newSavedOutfits = { ...savedOutfits };
    delete newSavedOutfits[outfitId];
    setSavedOutfits(newSavedOutfits);
    localStorage.setItem("savedOutfits", JSON.stringify(newSavedOutfits));
  };

  // Convert savedOutfits object to array for rendering
  const savedOutfitsArray = Object.values(savedOutfits);

  return (
    <div className="bg-[#e3ecd9] min-h-screen p-4 md:p-8">
      <div className="max-w-8xl mx-auto">
        <div className="flex  gap-8">

        

          <div className="bg-gradient-to-r from-lime-400 via-lime-600 to-cyan-500   h-min  rounded-xl shadow-md p-6 w-2xl">
            <OutfitForm />
          </div>
  
          {/* Outfit Form  */}

          <div className="lg:col-span-2">
            <div className="bg-[#c5d7b1] rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-matcha-green mb-6">
                Saved Outfits
              </h2>

              {savedOutfitsArray.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    You haven't saved any outfits yet.
                  </p>
                  <p className="text-gray-400">
                    Enda gallery buana !!!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedOutfitsArray.map((outfit) => (
                    <div
                      key={outfit.id}
                      className="relative bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <img
                        src={outfit.image_url}
                        alt={outfit.name}
                        className="w-full h-48 object-cover"
                      />


                      <button
                        onClick={() => removeOutfit(outfit.id)}
                        className="absolute top-2 right-2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all duration-200"
                        title="Remove from saved"
                      >
                        <FaTimes className="text-red-500" />
                      </button>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {outfit.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {outfit.description}
                        </p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Color: {outfit.color}</span>
                          <span>Occasion: {outfit.occasion_id}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
