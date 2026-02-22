"use client";

import { TrendingUp, CheckCircle, Gift, Clock } from "lucide-react";
import { Offer } from "./ManageOffer/ManageOffersTab";

const stats = [
  {
    label: "Total Redemptions",
    value: "156",
    sub: "All-time total",
    icon: TrendingUp,
    color: "text-yellow-500",
  },
  {
    label: "This Month",
    value: "45",
    sub: "Monthly redemptions",
    icon: CheckCircle,
    color: "text-emerald-400",
  },
  {
    label: "Active Offers",
    value: "3",
    sub: "Currently published",
    icon: Gift,
    color: "text-blue-400",
  },
  {
    label: "Daily Attendance",
    value: "23/50",
    sub: "Today's check-ins",
    icon: Clock,
    color: "text-purple-400",
  },
];


export default function DashboardTab({ offers }: { offers: Offer[] }) {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:scale-105 transition-transform"
          >
            <p className="text-sm text-gray-500">{s.label}</p>

            <div className="flex items-end justify-between mt-3">
              <div>
                <p className={`text-3xl font-bold ${s.color}`}>
                  {s.value}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {s.sub}
                </p>
              </div>

              <s.icon
                className={`w-6 h-6 ${s.color} opacity-60`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Offers */}
      <div className="bg-white rounded-lg border border-yellow-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900">
          Recent Offers
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Your submitted and active offers
        </p>

        <div className="space-y-3">
          {(offers.slice(0, 3)).map((o) => (
            <div
              key={o._id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {o.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Views: 0000 · Redemptions: 0000
                </p>
              </div>

              <span
                className={`inline-block text-xs font-medium px-2 py-0.5 rounded mt-1 ${o.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
                  }`}
              >
                {o.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
