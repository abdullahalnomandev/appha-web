"use client";

import { useState } from "react";
import { Gift, Clock } from "lucide-react";
import { Modal, Button, Pagination } from "antd";
import { toast } from "sonner";
import { getImage } from "@/lib/api/api-fech";
import { OfferModal } from "./OfferModal";
import { Heart } from "lucide-react";

interface Offer {
  _id: string;
  name: string;
  user: { _id: string; name: string };
  title: string;
  address: string;
  location: { type: string; coordinates: [number, number] };
  image: string[];
  description: string;
  discount: { enable: boolean; value: number };
  category: { _id: string; name: string };
  status: string;
  published: boolean;
  isFavourite: boolean;
}

interface OffersTabProps {
  offers: Offer[];
}

const OffersTab = ({ offers }: OffersTabProps) => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9; // number of offers per page
  const totalPages = Math.ceil(offers.length / pageSize);

  const handlePreview = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleRedeem = () => {
    if (!selectedOffer) return;
    toast.success("Offer redeemed successfully! Show this to the partner.");
    setIsModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Slice offers for current page
  const paginatedOffers = offers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Available Offers</h3>
          <p className="text-sm text-white/40">Browse and redeem partner offers</p>
        </div>
        <span className="text-xs text-amber border border-amber/30 rounded-full px-3 py-1">
          {offers.length} available
        </span>
      </div>

      {/* Offer List */}
      <div className="space-y-3">
        {paginatedOffers.map((offer) => (
          <div
            key={offer._id}
            className="bg-navy-light rounded-lg border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Thumbnail */}
            {offer.image[0] && (
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
                  <Gift className="w-4 h-4 text-amber" />
                  <h4 className="text-white font-semibold text-lg">{offer.title}</h4>
                </div>

                <div className="text-xs text-white/40  gap-2 sm:gap-4">
                  <p><strong>Partner:</strong> {offer.name}</p>
                  <p><strong>Category:</strong> {offer.category.name}</p>
                </div>

                {/* Discount Badge */}
                {offer.discount.enable && (
                  <span className="inline-block mt-2 text-xs font-medium text-black bg-amber px-2 py-1 rounded">
                    {offer.discount.value}% Off
                  </span>
                )}
              </div>
            </div>

            {/* Preview Button */}
            {/* <button
              onClick={() => handlePreview(offer)}
              className="text-sm font-medium px-5 py-2 rounded-md text-black cursor-pointer whitespace-nowrap"
              style={{ background: "linear-gradient(180deg, #FCEFAE 0%, #DFBB0B 100%)" }}
            >
              Preview Offer
            </button> */}
            <div className="flex flex-col justify-end">
              <Button
                type="link"
                className="underline flex items-center gap-1"
                onClick={() => toggleFavorite(offer._id)}
              >
                <Heart
                  className={`w-4 h-4 ${favorites.includes(offer._id) ? "fill-red-500 text-red-500" : ""
                    }`}
                />
              </Button>

              <Button
                type="link"
                className="underline"
                onClick={() => handlePreview(offer)}
              >
                Preview
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end-safe mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={offers.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            itemRender={(page, type, originalElement) => originalElement}
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