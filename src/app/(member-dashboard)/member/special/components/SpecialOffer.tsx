"use client";
import { Tag, Clock } from "lucide-react";
import { toast } from "sonner";

const specialOffers = [
  { id: 1, title: "Buy 1 Get 1 Free Detailing", partner: "AutoSpa Detailing", expiry: "Mar 25, 2026", description: "Limited: Buy one full detail, get one free for a friend.", badge: "HOT" },
  { id: 2, title: "50% Off First Month", partner: "FitPro Gym", expiry: "Apr 1, 2026", description: "Half price on your first month membership.", badge: "NEW" },
  { id: 3, title: "Exclusive Chef's Table", partner: "La Maison Restaurant", expiry: "Mar 31, 2026", description: "Private dining experience with the head chef — ALPHA members only.", badge: "VIP" },
];

const badgeColors: Record<string, string> = {
  HOT: "bg-red-500/20 text-red-400",
  NEW: "bg-blue-500/20 text-blue-400",
  VIP: "bg-amber/20 text-amber",
};

const SpecialOffersTab = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-bold text-white">Special Offers</h3>
      <p className="text-sm text-white/40">Limited-time exclusive deals for ALPHA members</p>
    </div>

    <div className="space-y-3">
      {specialOffers.map((o) => (
        <div key={o.id} className="bg-navy-light rounded-lg border border-[#DFBB0B]/30 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Tag className="w-4 h-4 text-amber" />
              <h4 className="text-white font-semibold">{o.title}</h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${badgeColors[o.badge] || ""}`}>{o.badge}</span>
            </div>
            <p className="text-sm text-white/60 mb-1">{o.description}</p>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span>{o.partner}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Expires {o.expiry}</span>
            </div>
          </div>
          <button
            onClick={() => toast.success(`Redeemed: ${o.title}`)}
            className="text-sm font-medium px-5 py-2 rounded-md text-[black] whitespace-nowrap"
            style={{ background: "linear-gradient(180deg, #FCEFAE 0%, #DFBB0B 100%)" }}
          >
            Redeem
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default SpecialOffersTab;
