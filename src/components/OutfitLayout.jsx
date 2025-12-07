import React, { useEffect, useState } from "react";
import Card from "./OutfitCard.jsx";
import { toast } from "react-toastify";

function Page_layout() {
  const [outfits, setOutfits] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState({});
  const [brands, setBrands] = useState([]);

  const [colorFilter, setColorFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  // load saved outfits
  useEffect(() => {
    const saved = localStorage.getItem("savedOutfits");
    if (saved) setSavedOutfits(JSON.parse(saved));
  }, []);

  // fetch outfits
  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/outfit");
        if (!res.ok) throw new Error("Failed to fetch outfits");
        const data = await res.json();
        setOutfits(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load outfits");
      }
    };
    fetchOutfits();
  }, []);

  // fetch brands (same endpoint Brand.jsx uses)
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/brand");
        if (!res.ok) throw new Error("Failed to fetch brands");
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load brands");
      }
    };
    fetchBrands();
  }, []);

  const handleToggleSave = (newSavedOutfits) => {
    setSavedOutfits(newSavedOutfits);
    localStorage.setItem("savedOutfits", JSON.stringify(newSavedOutfits));
  };

  // map brand_id -> brand object
  const brandById = Object.fromEntries(brands.map((b) => [b.id, b]));

  // unique colors from outfits
  const colors = Array.from(
    new Set(outfits.map((o) => o.color).filter(Boolean))
  );

  // unique brands from /brand endpoint
  const brandOptions = brands.map((b) => b.name);

  // filtered outfits (color + brand)
  const filteredOutfits = outfits.filter((o) => {
    const matchesColor = colorFilter
      ? o.color?.toLowerCase() === colorFilter.toLowerCase()
      : true;

    const outfitBrandName = brandById[o.brand_id]?.name;
    const matchesBrand = brandFilter
      ? outfitBrandName?.toLowerCase() === brandFilter.toLowerCase()
      : true;

    return matchesColor && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-[#F5F3E8] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <h1 className="text-xl font-semibold text-slate-800">
            Explore outfits
          </h1>

          <div className="flex flex-wrap gap-3">
            {/* Color filter */}
            <select
              value={colorFilter}
              onChange={(e) => setColorFilter(e.target.value)}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-800 shadow-sm"
            >
              <option value="">All colors</option>
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Brand filter fed from Brand.jsx API */}
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-800 shadow-sm"
            >
              <option value="">All brands</option>
              {brandOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            {/* Clear */}
            <button
              type="button"
              onClick={() => {
                setColorFilter("");
                setBrandFilter("");
              }}
              className="text-xs md:text-sm px-3 py-1 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Card now gets filtered list */}
        <Card prop={filteredOutfits} onToggleSave={handleToggleSave} />
      </div>
    </div>
  );
}

export default Page_layout;
