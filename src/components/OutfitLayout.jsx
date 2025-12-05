import React,{useEffect,useState} from "react";

import Card from './OutfitCard.jsx'
import { toast } from "react-toastify";




function page_layout() {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/outfits")
      .then((response) => response.json())
      .then((data) => setOutfits(data));
  }, []);

  return (
    <div className="m-0 p-0 w-[80vw] grid grid-cols-[repeat(auto-fill,250px)] auto-rows-[10px] absolute left-1/2 -translate-x-1/2 justify-center bg-black">

    </div>
  );
}

export default page_layout