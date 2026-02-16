"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "antd";
import OfferModal from "./OfferModal";

interface Offer {
  title: string;
  status: "approved" | "pending";
  views: number;
  redemptions: number;
}

const existingOffers: Offer[] = [
  {
    title: "20% Off Premium Detailing",
    status: "approved",
    views: 245,
    redemptions: 34,
  },
  {
    title: "Free Car Wash with Service",
    status: "pending",
    views: 0,
    redemptions: 0,
  },
  {
    title: "VIP Lounge Access",
    status: "approved",
    views: 189,
    redemptions: 67,
  },
];

const ManageOffersTab = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const handleAdd = () => {
    setEditingOffer(null); // Add new offer
    setModalOpen(true);
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setModalOpen(true);
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values, editingOffer);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Manage Offers</h2>
          <p className="text-sm text-gray-600">
            Create and manage your partnership offers
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={handleAdd}
          className="flex items-center gap-2 font-semibold text-white bg-blue-600 border-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> New Offer
        </Button>
      </div>

      {/* Offers List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-base font-bold text-gray-900">Your Offers</h3>
        <p className="text-sm text-gray-600 mb-4">
          Manage and update your existing offers
        </p>

        <div className="space-y-3">
          {existingOffers.map((o) => (
            <div
              key={o.title}
              className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{o.title}</p>

                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded mt-1 ${
                      o.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>

                <button
                  onClick={() => handleEdit(o)}
                  className="text-xs text-blue-600 cursor-pointer border border-blue-300 rounded px-3 py-1 hover:bg-blue-50 transition"
                >
                  Edit
                </button>
              </div>

              <div className="flex gap-6 mt-3 text-xs text-gray-600">
                <span>Total Views: {o.views}</span>
                <span>Redemptions: {o.redemptions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <OfferModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialValues={editingOffer || undefined}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ManageOffersTab;
