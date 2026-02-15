"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "antd";
import OfferModal from "./Modal/OfferModal";

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
          <h2 className="text-lg font-bold text-white">Manage Offers</h2>
          <p className="text-sm text-gray-400">
            Create and manage your partnership offers
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={handleAdd}
          className="flex items-center gap-2 font-semibold text-black bg-yellow-400 border-yellow-400 hover:bg-yellow-500"
        >
          <Plus className="w-4 h-4" /> New Offer
        </Button>
      </div>

      {/* Offers List */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-base font-bold text-white">Your Offers</h3>
        <p className="text-sm text-gray-400 mb-4">
          Manage and update your existing offers
        </p>

        <div className="space-y-3">
          {existingOffers.map((o) => (
            <div
              key={o.title}
              className="p-4 rounded-lg bg-slate-900 border border-slate-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{o.title}</p>

                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded mt-1 ${
                      o.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>

                <button
                  onClick={() => handleEdit(o)}
                  className="text-xs text-yellow-400 cursor-pointer border border-yellow-400/40 rounded px-3 py-1 hover:bg-yellow-400/10 transition"
                >
                  Edit
                </button>
              </div>

              <div className="flex gap-6 mt-3 text-xs text-gray-400">
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
