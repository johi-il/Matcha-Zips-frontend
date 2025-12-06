// Profile.jsx
import React, { useState } from "react";
import OutfitForm from "./OutfitForm"; // make sure this path is correct


const Profile = ({ data, currentUserId = 1 }) => {
  console.log("Data received:", data);
  if (!data) return <div className="p-6 text-red-500">Loading data...</div>;
  const { users, brands, occasions, outfits, favorites } = data;
  if (!users || !brands || !occasions || !outfits || !favorites) {
    return <div className="p-6 text-red-500">Data not available.</div>;
  }

  const [userData, setUserData] = useState(users);
  const [userOutfits, setUserOutfits] = useState(outfits);
  const [showOutfitForm, setShowOutfitForm] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

  const user = userData.find((u) => u.id === currentUserId);
  if (!user) return <div className="p-6 text-red-500">User not found.</div>;

  const brandsById = Object.fromEntries(brands.map((b) => [b.id, b]));
  const occasionsById = Object.fromEntries(occasions.map((o) => [o.id, o]));

  const outfitsForUser = userOutfits.filter((o) => o.user_id === currentUserId);

  const handleAddOutfit = (newOutfit) => {
    // newOutfit should come from Outform (name, description, color, image_url, brand_id, occasion_id)
    const nextId = (userOutfits[userOutfits.length - 1]?.id || 0) + 1;

    const outfitWithMeta = {
      id: nextId,
      user_id: currentUserId,
      ...newOutfit,
    };

    setUserOutfits((prev) => [...prev, outfitWithMeta]);
    setShowOutfitForm(false);
  };

  const handleUpdateUser = (updatedFields) => {
    setUserData((prev) =>
      prev.map((u) => (u.id === currentUserId ? { ...u, ...updatedFields } : u))
    );
    setShowEditUser(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Top row: avatar + username/bio + actions */}
        <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          {/* Avatar */}
          <div className="shrink-0">
            <img
              src={user.avatar_url}
              alt={user.username}
              className="h-28 w-28 rounded-full object-cover border-2 border-slate-700"
            />
          </div>

          {/* Username + bio + stats */}
          <div className="flex-1 w-full space-y-3">
            {/* Username + actions (like Instagram top row) */}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <h1 className="text-xl font-semibold">{user.username}</h1>

              {/* Edit user details */}
              <button
                onClick={() => setShowEditUser(true)}
                className="flex items-center justify-center h-8 w-8 rounded-full border border-slate-600 hover:border-emerald-500 text-slate-200 text-lg leading-none"
                title="Edit profile"
              >
                +
              </button>

              {/* Add outfit */}
              <button
                onClick={() => setShowOutfitForm(true)}
                className="flex items-center justify-center h-8 w-8 rounded-full border border-slate-600 hover:border-emerald-500 text-slate-200 text-lg leading-none"
                title="Add outfit"
              >
                +
              </button>
            </div>

            {/* Bio */}
            <p className="text-sm text-slate-300 text-center sm:text-left">
              {user.bio}
            </p>

            {/* Simple stats (like posts on IG) */}
            <div className="flex gap-6 justify-center sm:justify-start text-sm text-slate-200">
              <div>
                <span className="font-semibold">{outfitsForUser.length}</span>{" "}
                outfits
              </div>
              <div>
                <span className="font-semibold">
                  {favorites.filter((f) => f.user_id === currentUserId).length}
                </span>{" "}
                favorites
              </div>
            </div>
          </div>
        </section>

        {/* Grid of outfits (Instagram posts) */}
        <section>
          <h2 className="text-sm uppercase tracking-wide text-slate-400 mb-3">
            Quarter‑zip outfits
          </h2>
          {outfitsForUser.length === 0 ? (
            <p className="text-sm text-slate-400">
              No outfits yet. Tap the + icon to post your first quarter‑zip fit.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              {outfitsForUser.map((outfit) => (
                <article
                  key={outfit.id}
                  className="relative group aspect-square bg-slate-900 overflow-hidden"
                >
                  <img
                    src={outfit.image_url}
                    alt={outfit.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover overlay with small info */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-2 text-xs">
                    <div className="font-semibold line-clamp-1">
                      {outfit.name}
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-200">
                      <span className="line-clamp-1">
                        {brandsById[outfit.brand_id]?.name}
                      </span>
                      <span className="line-clamp-1">
                        {occasionsById[outfit.occasion_id]?.name}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Simple inline edit user modal (optional / tweak as you want) */}
        {showEditUser && (
          <EditUserModal
            user={user}
            onClose={() => setShowEditUser(false)}
            onSave={handleUpdateUser}
          />
        )}

        {/* Outfit form modal */}
        {showOutfitForm && (
          <OutfitFormModal onClose={() => setShowOutfitForm(false)}>
            <Outform onAddOutfit={handleAddOutfit} />
          </OutfitFormModal>
        )}
      </div>
    </div>
  );
};

export default Profile;
