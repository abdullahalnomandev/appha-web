"use client";
import { revalidateTagType } from "@/components/partnerDashboard/exclusiveOffer/exclusiveOfferActions";
import { apiFetch } from "@/lib/api/api-fech";
import { Star, MapPin, Gift, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FavoriteItem {
  _id: number | string;
  exclusiveOffer?: {
    _id?: number | string;
    name?: string;
    title?: string;
    category?: { name?: string };
    discount?: { enable: boolean; value?: number };
    address?: string;
  };
  offers?: number | null;
}

const FavoritesTab = ({ data }: { data: FavoriteItem[] }) => {
  const [loadingIds, setLoadingIds] = useState<(string | number)[]>([]);

  const removeFavorite = async (id: number | string) => {
    if (loadingIds.includes(id)) return; // prevent double click
    setLoadingIds((prev) => [...prev, id]);

    try {
      await apiFetch(`/exclusive-offer/favourite/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }, "client");

      // Remove from UI only after success
      revalidateTagType("favorites");
      toast.success("Removed from favorites");
    } catch (error) {
      console.error("Error clearing favorites:", error);
      toast.error("Failed to remove favorite on server");
    } finally {
      setLoadingIds((prev) => prev.filter((i) => i !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-black">Your Favorites</h3>
        <p className="text-sm text-gray-600">Saved partners and offers</p>
      </div>

      {data.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-10 text-center">
          <Star className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">
            No favorites yet. Browse offers and partners to save them here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((f: FavoriteItem) => {
            const offer = f.exclusiveOffer;
            const discount = offer?.discount;
            const isLoading = loadingIds.includes(offer?._id ?? f._id);

            return (
              <div
                key={f._id}
                className="rounded-xl border border-gray-200 bg-white p-5 flex items-start justify-between shadow hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <Star className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />

                  <div className="flex flex-col">
                    <h4 className="text-md font-semibold text-gray-900">{offer?.name || "Unnamed Offer"}</h4>

                    <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
                      {offer?.title && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                          {offer.title}
                        </span>
                      )}

                      {offer?.category?.name ? (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {offer.category.name}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          Uncategorized
                        </span>
                      )}

                      {discount?.enable && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {discount.value}%
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-gray-500 text-xs mt-1">
                      {offer?.address && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {offer.address}
                        </span>
                      )}

                      {f.offers !== null && (
                        <span className="flex items-center gap-1">
                          <Gift className="w-3 h-3" /> {f.offers} offers
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFavorite(offer?._id ?? f._id)}
                  disabled={isLoading}
                  className={`text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  title={isLoading ? "Removing..." : "Remove from favorites"}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesTab;