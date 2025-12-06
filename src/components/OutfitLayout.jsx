import React,{useEffect,useState} from "react";

import Card from './OutfitCard.jsx'
import { toast } from "react-toastify";




function Page_layout() {
  const [outfits, setOutfits] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState({});

  // Load saved outfits from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedOutfits");
    if (saved) {
      setSavedOutfits(JSON.parse(saved));
    }
  }, []);

  // Fetch outfits from your API
  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const response = await fetch("http://localhost:3001/outfits");
        const data = await response.json();
        setOutfits(data);
      } catch (error) {
        console.error("Error fetching outfits:", error);
      }
    };

    fetchOutfits();
  }, []);

  // Handle toggle save from Card component
  const handleToggleSave = (newSavedOutfits) => {
    setSavedOutfits(newSavedOutfits);
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8]  p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar if you have one */}
        {/* <SearchBar onSearch={handleSearch} /> */}

        {/* Card Component with saved outfits callback */}
        <Card prop={outfits} onToggleSave={handleToggleSave} />
      </div>
    </div>
  );
}
export default Page_layout