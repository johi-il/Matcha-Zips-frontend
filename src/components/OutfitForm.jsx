import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function OutfitForm() {
  const [outfitName, setOutfitName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [image_url, setImage_url] = useState("");

  const [brandId, setBrandId] = useState("");
  const [occasionId, setOccasionId] = useState("");

  const [brands, setBrands] = useState([]);
  const [occasions, setOccasions] = useState([]);

  // TODO: replace with real logged-in user id
  const USER_ID = 1;

  // load brands
  useEffect(() => {
    fetch("http://127.0.0.1:8000/brand")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load brands");
        return r.json();
      })
      .then((data) => setBrands(data))
      .catch((err) => {
        console.error("Failed to load Brands:", err);
        toast.error("Failed to load brands");
      });
  }, []);

  // load occasions
  useEffect(() => {
    fetch("http://127.0.0.1:8000/occasion")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load occasions");
        return r.json();
      })
      .then((data) => setOccasions(data))
      .catch((err) => {
        console.error("Failed to load Occasions:", err);
        toast.error("Failed to load occasions");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!outfitName || !description || !color || !image_url) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    // build payload matching OutfitSchema
    const newOutfit = {
      user_id: USER_ID,
      brand_id: brandId ? Number(brandId) : null,
      occasion_id: occasionId ? Number(occasionId) : null,
      name: outfitName.trim(),
      description: description.trim(),
      color: color.toLowerCase(),
      image_url: image_url.trim(),
    };

    fetch("http://127.0.0.1:8000/outfit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOutfit),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errBody = await response.json().catch(() => null);
          console.error("Backend error body:", errBody);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        toast.success("Outfit added successfully!");
        setOutfitName("");
        setDescription("");
        setColor("");
        setImage_url("");
        setBrandId("");
        setOccasionId("");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(
          "There was a problem adding your outfit. Please try again."
        );
      });
  };

  return (
    <form
      className="max-w-md mx-auto space-y-4 bg-white/80 backdrop-blur rounded-xl p-6 shadow"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-slate-900">
        Add a Matcha‑Zip Outfit
      </h2>

      {/* Brand select (optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select brand (optional)
        </label>
        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">No brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* Occasion select (optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Occasion (optional)
        </label>
        <select
          value={occasionId}
          onChange={(e) => setOccasionId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="">No occasion</option>
          {occasions.map((occ) => (
            <option key={occ.id} value={occ.id}>
              {occ.name}
            </option>
          ))}
        </select>
      </div>

      {/* Outfit name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Outfit name
        </label>
        <input
          value={outfitName}
          onChange={(e) => setOutfitName(e.target.value)}
          type="text"
          required
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 outline-none"
          placeholder="Matcha Monochrome Fit"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 outline-none"
          placeholder="Tell us about this quarter‑zip look..."
        />
      </div>

      {/* Color */}
      <div>
        <label
          htmlFor="color"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Main color
        </label>
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          type="text"
          required
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 outline-none"
          placeholder="e.g. #22c55e or Matcha Green"
        />
      </div>

      {/* Image URL */}
      <div>
        <label
          htmlFor="image_url"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Image URL
        </label>
        <input
          value={image_url}
          onChange={(e) => setImage_url(e.target.value)}
          type="url"
          required
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 outline-none"
          placeholder="https://example.com/your-outfit.jpg"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Post outfit
      </button>
    </form>
  );
}

export default OutfitForm;
