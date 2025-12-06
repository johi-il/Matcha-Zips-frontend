import React,{useEffect,useState} from "react";

import Card from './OutfitCard.jsx'
import { toast } from "react-toastify";




function Page_layout() {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/outfits")
      .then((response) => response.json())
      .then((data) => setOutfits(data));
  }, []);

  return (
    <div className="max-w-8xl mx-auto px-20 py-8 bg-[#e3ecd9]">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 ">
        Quarter Zip Galleria
      </h1>
      <Card prop={outfits} />
    </div>
  );
}

export default Page_layout