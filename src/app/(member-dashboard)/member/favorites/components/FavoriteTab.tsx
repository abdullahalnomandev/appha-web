"use client";
import { Star, MapPin, Gift, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initialFavorites = [
  { id: 1, name: "Azure Beach Club", type: "Partner", location: "JBR, Dubai", offers: 3 },
  { id: 2, name: "20% Off Premium Detailing", type: "Offer", location: "AutoSpa, Al Quoz", offers: null },
  { id: 3, name: "La Maison Restaurant", type: "Partner", location: "Downtown, Dubai", offers: 4 },
  { id: 4, name: "VIP Lounge Access", type: "Offer", location: "Azure Beach Club", offers: null },
  { id: 5, name: "FitPro Gym", type: "Partner", location: "DIFC, Dubai", offers: 2 },
];

const FavoritesTab = () => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
    toast.success("Removed from favorites");
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white">Your Favorites</h3>
        <p className="text-sm text-white/40">Saved partners and offers</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-navy-light rounded-lg border border-white/10 p-10 text-center">
          <Star className="w-8 h-8 text-white/20 mx-auto mb-2" />
          <p className="text-white/40 text-sm">No favorites yet. Browse offers and partners to save them here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((f) => (
            <div key={f.id} className="bg-navy-light rounded-lg border border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-yellow-400 fill-current shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{f.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-white/40 mt-0.5">
                    <span className="text-amber">{f.type}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {f.location}</span>
                    {f.offers !== null && (
                      <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> {f.offers} offers</span>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => removeFavorite(f.id)} className="text-white/30 hover:text-red-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesTab;
