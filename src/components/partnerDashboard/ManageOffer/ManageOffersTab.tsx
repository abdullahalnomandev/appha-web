"use client";

import { use, useState } from "react";
import { Plus } from "lucide-react";
import { Button, Switch } from "antd";
import OfferModal from "./OfferModal";
import { ExclusiveOfferInfoModal } from "../exclusiveOffer/ExclusiveOfferInfoModal";
import { apiFetch } from "@/lib/api/api-fech";

interface Offer {
  _id: string;
  name: string;
  title: string;
  address: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  image: string[];
  description: string;
  discount?: {
    enable: boolean;
    value: number;
  };
  category: {
    _id: string;
    name: string;
  };
  published: boolean;
  isFavourite?: boolean;

  // legacy / UI-only fields
  status?: "approved" | "pending";
  views?: number;
  redemptions?: number;
}


const fetchOffers = apiFetch('/exclusive-offer?page=1&limit=100', {
    method: 'GET',
  },'client')


const ManageOffersTab = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const existingOffers = use(fetchOffers);

  const offers = (existingOffers as { data?: Offer[] })?.data || [] as Offer[];
  console.log({offersSS:offers});
  // ✅ View modal state
  const [viewOpen, setViewOpen] = useState(false);
  const [viewItem, setViewItem] = useState<Offer | null>(null);

  const handleAdd = () => {
    setEditingOffer(null);
    setModalOpen(true);
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setModalOpen(true);
  };

  const handleView = (offer: Offer) => {
    setViewItem(offer);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setViewItem(null);
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values, editingOffer);
    setModalOpen(false);
  };

  const handleTogglePublish = (checked: boolean, offer: Offer) => {
    const updated = offers.map((o) =>
      o.title === offer.title ? { ...o, published: checked } : o
    );
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
          {offers?.map((o) => (
            <div
              key={o.title}
              className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {o.name}
                  </p>

                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded mt-1 ${
                      o.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : o.status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleView(o)}
                    className="text-xs text-gray-600 cursor-pointer border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleEdit(o)}
                    className="text-xs text-blue-600 cursor-pointer border border-blue-300 rounded px-3 py-1 hover:bg-blue-50 transition"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Stats + Publish */}
              <div className="flex justify-between gap-6 mt-3 text-xs text-gray-600">
                <div className="flex gap-3 items-center">
                  <span>Total Views: 000 </span>
                  <span>Redemptions: 000</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500 font-medium">
                    Published
                  </span>
                  <Switch
                    size="small"
                    checked={o.published}
                    onChange={(checked) => handleTogglePublish(checked, o)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit/Add Modal */}
      <OfferModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialValues={editingOffer || undefined}
        onSubmit={handleSubmit}
      />

      {/* ✅ Exclusive Offer View Modal */}
      <ExclusiveOfferInfoModal
        open={viewOpen}
        data={viewItem as any}
        onClose={handleViewClose}
      />
    </div>
  );
};

export default ManageOffersTab;
