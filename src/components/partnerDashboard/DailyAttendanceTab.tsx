"use client";

import { useState } from "react";
import { Search, CalendarCheck } from "lucide-react";
import { toast } from "sonner";

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) {
      toast.error("Please enter membership number");
      return;
    }

    // Fake API result (replace later)
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
            className="bg-slate-800 rounded-lg border border-slate-700 p-5"
          >
            <p className="text-sm text-gray-400">{s.label}</p>
            <p className={`text-3xl font-bold mt-3 ${s.color}`}>
              {s.value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Attendance System */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h3 className="text-base font-bold text-white">
          Attendance Validation System
        </h3>

        <p className="text-sm text-gray-400 mb-5">
          Search members, confirm attendance, and track daily usage in
          real-time
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <div className="flex-1">
            <label className="text-sm font-medium text-yellow-400 block mb-1.5">
              Membership Number
            </label>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter membership number"
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="self-end flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-black text-sm bg-yellow-400 hover:bg-yellow-500 transition"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </form>

        {/* Empty State */}
        {!found ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <CalendarCheck className="w-12 h-12 mb-3 opacity-40" />
            <p className="text-sm">
              Enter a membership number to validate attendance
            </p>
          </div>
        ) : (
          /* Found Member */
          <div className="p-5 rounded-lg bg-slate-900 border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                <CalendarCheck className="w-6 h-6 text-yellow-400" />
              </div>

              <div>
                <p className="font-semibold text-white">{found.name}</p>
                <p className="text-xs text-gray-400">{found.id}</p>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-2.5 rounded-md font-semibold text-black text-sm bg-yellow-400 hover:bg-yellow-500 transition"
            >
              Confirm Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyAttendanceTab;
