"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Modal, Pagination } from "antd";
import { Partner } from "@/types/main";
import { getImage } from "@/lib/api/api-fech";

interface PartnerDirectoryProps {
  data: Partner[];
  currentPage: number;
  searchTerm: string;
  total: number; // total count from server
}

export default function PartnerDirectory({
  data,
  currentPage,
  searchTerm,
  total,
}: PartnerDirectoryProps) {
  const router = useRouter();
  const pageSize = 10;

  const [search, setSearch] = useState(searchTerm);
  const [page, setPage] = useState(currentPage);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [open, setOpen] = useState(false);

  const openModal = (partner: Partner) => {
    setSelectedPartner(partner);
    setOpen(true);
  };

  // Handle search submit
  const handleSearch = () => {
    router.push(
      `/member/partner-directory?page=1&searchTerm=${encodeURIComponent(search)}` // reset to page 1
    );
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search partners..."
          className="w-full  border border-gray-300 rounded-md pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((p) => (
          <div
            key={p._id}
            onClick={() => openModal(p)}
            className=" cursor-pointer rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition"
          >
            {p.profileImage && (
              <img
                src={getImage(p.profileImage)}
                alt={p.companyName}
                className="w-12 h-12 rounded-full mb-2 object-cover"
              />
            )}
            <h4 className="text-gray-900 font-semibold">{p.companyName}</h4>
            <p className="text-xs text-blue-500 mt-1">{p.industry}</p>
            <div className="mt-3 text-xs text-gray-600 space-y-1">
              <p>Name: {p.contactName}</p>
              <p>Email: {p.contactEmail}</p>
              <p>Phone: {p.contactPhone}</p>
            </div>
            <div className="mt-3 flex justify-between text-xs">
              <span className="text-gray-400">{p.partnerShipId}</span>
              <span
                className={
                  p.partnerShipStatus === "active"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {p.partnerShipStatus}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end pt-6">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(p) => {
            setPage(p);
            router.push(
              `/member/partner-directory?page=${p}&searchTerm=${encodeURIComponent(
                search
              )}`
            );
          }}
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
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Partnership ID:</strong> {selectedPartner.partnerShipId}
            </p>
            <p>
              <strong>Company Name:</strong> {selectedPartner.companyName}
            </p>
            <p>
              <strong>Industry:</strong> {selectedPartner.industry}
            </p>
            <p>
              <strong>Contact Name:</strong> {selectedPartner.contactName}
            </p>
            <p>
              <strong>Email:</strong> {selectedPartner.contactEmail}
            </p>
            <p>
              <strong>Phone:</strong> {selectedPartner.contactPhone}
            </p>
            <p>
              <strong>Website:</strong> {selectedPartner.website}
            </p>
            <p>
              <strong>Message:</strong> {selectedPartner.message}
            </p>
            <p>
              <strong>Status:</strong> {selectedPartner.partnerShipStatus}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedPartner.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(selectedPartner.updatedAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}