"use client";

import { TrendingUp, CheckCircle, Gift, Clock } from "lucide-react";

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

const recentOffers = [
  {
    title: "20% Off Premium Detailing",
    views: 245,
    redemptions: 34,
    status: "approved",
  },
  {
    title: "Free Car Wash with Service",
    views: 0,
    redemptions: 0,
    status: "pending",
  },
  {
    title: "VIP Lounge Access",
    views: 189,
    redemptions: 67,
    status: "approved",
  },
];

export default function DashboardTab() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#1e293b] rounded-lg border border-white/10 p-5"
          >
            <p className="text-sm text-white/50">{s.label}</p>

            <div className="flex items-end justify-between mt-3">
              <div>
                <p className={`text-3xl font-bold ${s.color}`}>
                  {s.value}
                </p>
                <p className="text-xs text-white/40 mt-1">
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
      <div className="bg-[#1e293b] rounded-lg border border-yellow-500/30 p-6">
        <h3 className="text-base font-bold text-white">
          Recent Offers
        </h3>
        <p className="text-sm text-white/40 mb-4">
          Your submitted and active offers
        </p>

        <div className="space-y-3">
          {recentOffers.map((o) => (
            <div
              key={o.title}
              className="flex items-center justify-between p-4 rounded-lg bg-[#0f172a] border border-white/5"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  {o.title}
                </p>
                <p className="text-xs text-white/40 mt-0.5">
                  Views: {o.views} · Redemptions: {o.redemptions}
                </p>
              </div>

              <span
                className={`text-xs font-medium px-2.5 py-1 rounded ${
                  o.status === "approved"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-orange-500/20 text-orange-400"
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
