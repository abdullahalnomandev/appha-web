"use client";

import { useState } from "react";
import { Search, CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { Form, Input, Button } from "antd";

interface Member {
  name: string;
  id: string;
}

const DailyAttendanceTab = () => {
  const [search, setSearch] = useState("");
  const [found, setFound] = useState<Member | null>(null);

  const stats = [
    {
      label: "Today's Check-ins",
      value: "23",
      sub: "Resets automatically at midnight",
      color: "text-yellow-400",
    },
    {
      label: "Daily Limit",
      value: "50",
      sub: "As per partnership agreement",
      color: "text-blue-400",
    },
    {
      label: "Remaining",
      value: "27",
      sub: "Available slots today",
      color: "text-green-400",
    },
  ];

  const handleSearch = () => {
    if (!search.trim()) {
      toast.error("Please enter membership number");
      return;
    }

    setFound({
      name: "Ahmed Al Maktoum",
      id: search,
    });

    toast.success("Member found!");
  };

  const handleConfirm = () => {
    toast.success("Attendance confirmed!");
    setFound(null);
    setSearch("");
  };

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-lg border border-gray-200 p-5 hover:scale-105 transition-transform"
          >
            <p className="text-sm text-gray-600">{s.label}</p>
            <p className={`text-3xl font-bold mt-3 ${s.color}`}>
              {s.value}
            </p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Attendance System */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-base font-bold text-gray-900">
          Attendance Validation System
        </h3>

        <p className="text-sm text-gray-600 mb-5">
          Search members, confirm attendance, and track daily usage in
          real-time
        </p>

        {/* 🔎 Ant Design Search Form */}
        <Form layout="vertical" onFinish={handleSearch} className="mb-6">
          <div className="flex gap-3 items-end">
            <Form.Item
              label="Membership Number"
              className="flex-1 mb-0"
            >
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter membership number"
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
            <CalendarCheck className="w-12 h-12 mb-3 opacity-60" />
            <p className="text-sm">
              Enter a membership number to validate attendance
            </p>
          </div>
        ) : (
          /* Found Member */
          <div className="p-5 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <CalendarCheck className="w-6 h-6 text-yellow-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">{found.name}</p>
                <p className="text-xs text-gray-500">{found.id}</p>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              block
              onClick={handleConfirm}
            >
              Confirm Attendance
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyAttendanceTab;
