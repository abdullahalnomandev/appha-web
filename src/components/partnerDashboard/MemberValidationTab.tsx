"use client";

import { useState } from "react";
import { Search, Users, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Form, Input, Button } from "antd";

interface Member {
  name: string;
  id: string;
  eligible: boolean;
}

const MemberValidationTab = () => {
  const [search, setSearch] = useState("");
  const [found, setFound] = useState<Member | null>(null);

  const handleSearch = () => {
    if (!search.trim()) {
      toast.error("Please enter membership number");
      return;
    }

    // Fake search result (replace with API call later)
    setFound({
      name: "Ahmed Al Maktoum",
      id: search,
      eligible: true,
    });

    toast.success("Member found!");
  };

  const handleConfirm = () => {
    toast.success("Redemption confirmed successfully!");
    setFound(null);
    setSearch("");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-base font-bold text-gray-900">
        Validate Member & Confirm Redemption
      </h3>

      <p className="text-sm text-gray-500 mb-5">
        Search for members using their unique membership number and confirm
        privilege redemptions
      </p>

      {/* 🔎 Search Section (Ant Design) */}
      <Form
        layout="vertical"
        onFinish={handleSearch}
        className="mb-6"
      >
        <div className="flex gap-3 items-end">
          <Form.Item
            label="Membership Number"
            className="flex-1 mb-0"
          >
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter membership number (e.g., M-2024-001)"
              size="large"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              icon={<Search size={16} />}
            >
              Search
            </Button>
          </Form.Item>
        </div>
      </Form>

      {/* Empty State */}
      {!found ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Users className="w-12 h-12 mb-3 opacity-40" />
          <p className="text-sm">
            Enter a membership number to search for a member
          </p>
        </div>
      ) : (
        /* Found Member */
        <div className="p-5 rounded-lg bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-500" />
            </div>

            <div>
              <p className="font-semibold text-gray-900">{found.name}</p>
              <p className="text-xs text-gray-500">{found.id}</p>
            </div>

            {found.eligible && (
              <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded bg-green-100 text-green-600">
                <CheckCircle className="w-3 h-3" />
                Eligible
              </span>
            )}
          </div>

          <Button
            type="primary"
            size="large"
            block
            onClick={handleConfirm}
          >
            Confirm Redemption
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemberValidationTab;
