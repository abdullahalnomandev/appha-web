"use client";
import { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";

const categories = ["All", "Beach Clubs", "Gyms & Fitness", "Restaurants", "Car Services", "Hotels", "Spas"];

const partners = [
  { name: "Azure Beach Club", category: "Beach Clubs", location: "JBR, Dubai", rating: 4.8, offers: 3, description: "Exclusive beachfront experience with VIP cabanas" },
  { name: "FitPro Gym", category: "Gyms & Fitness", location: "DIFC, Dubai", rating: 4.6, offers: 2, description: "Premium fitness center with personal training" },
  { name: "La Maison Restaurant", category: "Restaurants", location: "Downtown, Dubai", rating: 4.9, offers: 4, description: "Fine dining with exclusive ALPHA member menu" },
  { name: "AutoSpa Detailing", category: "Car Services", location: "Al Quoz, Dubai", rating: 4.7, offers: 5, description: "Premium car detailing and protection services" },
  { name: "Oasis Spa & Wellness", category: "Spas", location: "Palm Jumeirah", rating: 4.5, offers: 2, description: "Luxury spa treatments for ALPHA members" },
  { name: "Marina Grand Hotel", category: "Hotels", location: "Dubai Marina", rating: 4.8, offers: 3, description: "5-star accommodation with member rates" },
];

const PartnerDirectory = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = partners.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search partners..."
            className="w-full bg-navy-light border border-white/10 rounded-md pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber/50"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "text-navy bg-amber"
                : "text-white/60 border border-white/10 hover:border-white/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div key={p.name} className="bg-navy-light rounded-lg border border-white/10 p-5 hover:border-amber/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-white font-semibold">{p.name}</h4>
                <span className="text-xs text-amber">{p.category}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs">{p.rating}</span>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-3">{p.description}</p>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-white/40">
                <MapPin className="w-3 h-3" /> {p.location}
              </span>
              <span className="text-xs text-amber font-medium">{p.offers} offers</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerDirectory;
