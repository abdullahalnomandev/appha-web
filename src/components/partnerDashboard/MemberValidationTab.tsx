"use client";

import { useState } from "react";
import { Search, Users, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Member {
  name: string;
  id: string;
  eligible: boolean;
}

const MemberValidationTab = () => {
  const [search, setSearch] = useState("");
  const [found, setFound] = useState<Member | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

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
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <h3 className="text-base font-bold text-white">
        Validate Member & Confirm Redemption
      </h3>

      <p className="text-sm text-gray-400 mb-5">
        Search for members using their unique membership number and confirm
        privilege redemptions
      </p>

      {/* Search Section */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <div className="flex-1">
          <label className="text-sm font-medium text-yellow-400 block mb-1.5">
            Membership Number
          </label>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter membership number (e.g., M-2024-001)"
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
          <Users className="w-12 h-12 mb-3 opacity-40" />
          <p className="text-sm">
            Enter a membership number to search for a member
          </p>
        </div>
      ) : (
        /* Found Member */
        <div className="p-5 rounded-lg bg-slate-900 border border-slate-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-400" />
            </div>

            <div>
              <p className="font-semibold text-white">{found.name}</p>
              <p className="text-xs text-gray-400">{found.id}</p>
            </div>

            {found.eligible && (
              <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded bg-green-500/20 text-green-400">
                <CheckCircle className="w-3 h-3" />
                Eligible
              </span>
            )}
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-2.5 rounded-md font-semibold text-black text-sm bg-yellow-400 hover:bg-yellow-500 transition"
          >
            Confirm Redemption
          </button>
        </div>
      )}
    </div>
  );
};

export default MemberValidationTab;
