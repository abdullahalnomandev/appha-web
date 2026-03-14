"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Gift, Heart } from "lucide-react";
import { Button, Pagination } from "antd";
import { toast } from "sonner";
import { apiFetch, getImage } from "@/lib/api/api-fech";
import { OfferModal } from "./OfferModal";
import { Offer } from "@/types/main";

interface OffersTabProps {
  data: Offer[];
  currentPage: number;
  searchTerm: string;
  total: number;
}

const OffersTab = ({ data, total, currentPage, searchTerm }: OffersTabProps) => {
  const router = useRouter();
  const pageSize = 10;

  const [search, setSearch] = useState(searchTerm);
  const [page, setPage] = useState(currentPage);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Sync favorites with API data
  useEffect(() => {
    const favIds = data
      .filter((offer) => offer.isFavourite)
      .map((offer) => offer._id);

    setFavorites(favIds);
  }, [data]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handlePreview = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleRedeem = () => {
    if (!selectedOffer) return;
    toast.success("Offer redeemed successfully! Show this to the partner.");
    setIsModalOpen(false);
  };

  const handleToggleFavorite = async (id: string) => {
    toggleFavorite(id); // optimistic update

    try {
      const fb = await apiFetch(
        `/exclusive-offer/favourite/${id}`,
        { method: "POST" },
        "client"
      ) as any;

      toast.success(
        fb?.data?.favourite
          ? "Offer favorited successfully!"
          : "Offer unfavorited successfully!"
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Available Offers</h3>
          <p className="text-sm text-gray-500">
            Browse and redeem partner offers
          </p>
        </div>
        <span className="text-xs text-amber-600 border border-amber-300 rounded-full px-3 py-1">
          {total} available
        </span>
      </div>

      {/* Offer List */}
      <div className="space-y-3">
        {data.map((offer) => (
          <div
            key={offer._id}
            className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow duration-200"
          >
            {offer.image?.[0] && (
              <img
                src={getImage(offer.image[0])}
                alt={offer.title}
                className="w-24 h-24 rounded object-cover flex-shrink-0"
              />
            )}

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-4 h-4 text-amber-600" />
                  <h4 className="text-gray-900 font-semibold text-lg">{offer.name}</h4>
                </div>

                <div className="text-xs text-gray-500 gap-2 sm:gap-4">
                  <p>
                    <strong>title:</strong> {offer.title}
                  </p>
                  <p>
                    <strong>Category:</strong> {offer.category.name}
                  </p>
                </div>

                {offer.discount.enable && (
                  <span className="inline-block mt-2 text-xs font-medium text-white bg-amber-600 px-2 py-1 rounded">
                    {offer.discount.value}% Off
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-end gap-2">
              <Button
                type="link"
                className="underline flex items-center gap-1"
                onClick={() => handleToggleFavorite(offer._id)}
              >
                <Heart
                  className={`w-4 h-4 ${favorites.includes(offer._id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                    }`}
                />
              </Button>

              <Button
                type="link"
                className="underline text-gray-600"
                onClick={() => handlePreview(offer)}
              >
                Preview
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {total > pageSize && (
        <div className="flex justify-end mt-4">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={(p) => {
              setPage(p);
              router.push(
                `/member/offers?page=${p}&searchTerm=${encodeURIComponent(search)}`
              );
            }}
          />
        </div>
      )}

      {/* Modal */}
      <OfferModal
        open={isModalOpen}
        data={selectedOffer}
        onClose={() => setIsModalOpen(false)}
        onRedeem={handleRedeem}
      />
    </div>
  );
};

export default OffersTab;