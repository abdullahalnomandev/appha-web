"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Modal, Pagination } from "antd";

const partners = [
  {
    id: "PC-00008",
    company: "Chris Alpha Test",
    industry: "Automotive Sales",
    contactName: "Chris",
    email: "chrislarellis36@gmail.com",
    phone: "+971581011889",
    website: "www.alphalogistics.com",
    message: "Looking forward to partnering with ALPHA.",
    status: "Active",
    createdAt: "02 Mar 2026",
  },
  {
    id: "PC-00009",
    company: "Marina Elite Cars",
    industry: "Car Rental",
    contactName: "David Smith",
    email: "david@marinaelitecars.com",
    phone: "+971507654321",
    website: "www.marinaelitecars.com",
    message: "We provide luxury car rentals for premium members.",
    status: "Active",
    createdAt: "03 Mar 2026",
  },
  {
    id: "PC-00010",
    company: "Palm Wellness Spa",
    industry: "Spa & Wellness",
    contactName: "Sarah Khan",
    email: "sarah@palmwellnessspa.com",
    phone: "+971552345678",
    website: "www.palmwellnessspa.com",
    message: "Interested in offering exclusive spa packages.",
    status: "Pending",
    createdAt: "04 Mar 2026",
  },
  {
    id: "PC-00011",
    company: "Downtown Gourmet",
    industry: "Restaurant",
    contactName: "Ahmed Ali",
    email: "ahmed@downtowngourmet.ae",
    phone: "+971508889900",
    website: "www.downtowngourmet.ae",
    message: "Fine dining offers for ALPHA members.",
    status: "Active",
    createdAt: "05 Mar 2026",
  },
  {
    id: "PC-00012",
    company: "FitPro Performance Gym",
    industry: "Fitness",
    contactName: "Michael Brown",
    email: "michael@fitprogym.com",
    phone: "+971563214567",
    website: "www.fitprogym.com",
    message: "Exclusive gym membership discounts.",
    status: "Active",
    createdAt: "06 Mar 2026",
  },
  {
    id: "PC-00013",
    company: "Luxury Stay Hotels",
    industry: "Hospitality",
    contactName: "Emily Johnson",
    email: "emily@luxurystayhotels.com",
    phone: "+971545678123",
    website: "www.luxurystayhotels.com",
    message: "Special room rates for premium members.",
    status: "Pending",
    createdAt: "07 Mar 2026",
  },
];

export default function PartnerDirectory() {
  const [search, setSearch] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 6; // number of partners per page

  const filtered = partners.filter((p) =>
    p.company.toLowerCase().includes(search.toLowerCase())
  );

  // Slice for pagination
  const paginatedPartners = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const openModal = (partner: any) => {
    setSelectedPartner(partner);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page on search
          }}
          placeholder="Search partners..."
          className="w-full bg-navy-light border border-white/10 rounded-md pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber/50"
        />
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedPartners.map((p) => (
          <div
            key={p.id}
            onClick={() => openModal(p)}
            className="bg-navy-light cursor-pointer rounded-lg border border-white/10 p-5 hover:border-amber/30 transition"
          >
            <h4 className="text-white font-semibold">{p.company}</h4>
            <p className="text-xs text-amber mt-1">{p.industry}</p>
            <div className="mt-3 text-xs text-white/60 space-y-1">
              <p>Contact: {p.contactName}</p>
              <p>Email: {p.email}</p>
            </div>
            <div className="mt-3 flex justify-between text-xs">
              <span className="text-white/40">{p.id}</span>
              <span className="text-green-400">{p.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-self-end pt-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={filtered.length}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
        />
      </div>

      {/* Modal */}
      <Modal
        title="Partner Details"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        rootClassName="alpha-partner-modal"
      >
        {selectedPartner && (
          <div className="space-y-2 text-sm">
            <p>
              <strong>Partnership ID:</strong> {selectedPartner.id}
            </p>
            <p>
              <strong>Company Name:</strong> {selectedPartner.company}
            </p>
            <p>
              <strong>Industry:</strong> {selectedPartner.industry}
            </p>
            <p>
              <strong>Contact Name:</strong> {selectedPartner.contactName}
            </p>
            <p>
              <strong>Email:</strong> {selectedPartner.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedPartner.phone}
            </p>
            <p>
              <strong>Website:</strong> {selectedPartner.website}
            </p>
            <p>
              <strong>Message:</strong> {selectedPartner.message}
            </p>
            <p>
              <strong>Status:</strong> {selectedPartner.status}
            </p>
            <p>
              <strong>Created At:</strong> {selectedPartner.createdAt}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}