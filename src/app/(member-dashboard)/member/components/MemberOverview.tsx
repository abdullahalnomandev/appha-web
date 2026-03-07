"use client"
import { Gift, Calendar, Star, TrendingUp } from "lucide-react";

const stats = [
  { label: "Available Offers", value: "24", sub: "Active partner offers", icon: Gift, color: "text-amber" },
  { label: "Upcoming Events", value: "5", sub: "This month", icon: Calendar, color: "text-blue-400" },
  { label: "Favorites", value: "8", sub: "Saved offers & partners", icon: Star, color: "text-yellow-400" },
  { label: "Redemptions", value: "12", sub: "Offers redeemed", icon: TrendingUp, color: "text-emerald-400" },
];

const recentActivity = [
  { text: "Redeemed 20% Off Premium Detailing at AutoSpa", time: "2 hours ago" },
  { text: "Added VIP Lounge Access to favorites", time: "Yesterday" },
  { text: "RSVP'd to ALPHA Networking Night", time: "3 days ago" },
  { text: "Submitted feedback for Car Wash Plus", time: "1 week ago" },
];

const MemberOverviewTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-navy-light rounded-lg border border-white/10 p-5">
          <p className="text-sm text-white/50">{s.label}</p>
          <div className="flex items-end justify-between mt-3">
            <div>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-white/40 mt-1">{s.sub}</p>
            </div>
            <s.icon className={`w-6 h-6 ${s.color} opacity-60`} />
          </div>
        </div>
      ))}
    </div>

    <div className="bg-navy-light rounded-lg border border-[#DFBB0B]/30 p-6">
      <h3 className="text-base font-bold text-white">Recent Activity</h3>
      <p className="text-sm text-white/40 mb-4">Your latest interactions</p>
      <div className="space-y-3">
        {recentActivity.map((a, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-navy border border-white/5">
            <p className="text-sm text-white">{a.text}</p>
            <span className="text-xs text-white/40 whitespace-nowrap ml-4">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MemberOverviewTab;
