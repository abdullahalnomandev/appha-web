"use client";
import { useState } from "react";
import { Gift, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const offers = [
  { id: 1, title: "20% Off Premium Detailing", partner: "AutoSpa Detailing", expiry: "Mar 30, 2026", description: "Full interior & exterior premium detailing service", redeemed: false },
  { id: 2, title: "Free Car Wash with Service", partner: "QuickLube Center", expiry: "Apr 15, 2026", description: "Complimentary car wash with any service booking", redeemed: false },
  { id: 3, title: "VIP Lounge Access", partner: "Azure Beach Club", expiry: "Dec 31, 2026", description: "Exclusive access to VIP lounge area with complimentary drinks", redeemed: true },
  { id: 4, title: "15% Off Fine Dining", partner: "La Maison Restaurant", expiry: "Jun 30, 2026", description: "Discount on the full à la carte menu", redeemed: false },
  { id: 5, title: "1 Month Free Membership", partner: "FitPro Gym", expiry: "May 1, 2026", description: "Try our premium fitness facilities free for one month", redeemed: false },
];

const OffersTab = () => {
  const [offerList, setOfferList] = useState(offers);

  const handleRedeem = (id: number) => {
    setOfferList((prev) => prev.map((o) => (o.id === id ? { ...o, redeemed: true } : o)));
    toast.success("Offer redeemed successfully! Show this to the partner.");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Available Offers</h3>
          <p className="text-sm text-white/40">Browse and redeem partner offers</p>
        </div>
        <span className="text-xs text-amber border border-amber/30 rounded-full px-3 py-1">
          {offerList.filter((o) => !o.redeemed).length} available
        </span>
      </div>

      <div className="space-y-3">
        {offerList.map((o) => (
          <div key={o.id} className="bg-navy-light rounded-lg border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Gift className="w-4 h-4 text-amber" />
                <h4 className="text-white font-semibold">{o.title}</h4>
              </div>
              <p className="text-sm text-white/60 mb-1">{o.description}</p>
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span>{o.partner}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Expires {o.expiry}
                </span>
              </div>
            </div>
            {o.redeemed ? (
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-md">
                <CheckCircle className="w-3.5 h-3.5" /> Redeemed
              </span>
            ) : (
              <button
                onClick={() => handleRedeem(o.id)}
                className="text-sm font-medium px-5 py-2 rounded-md text-black cursor-pointer whitespace-nowrap"
                style={{ background: "linear-gradient(180deg, #FCEFAE 0%, #DFBB0B 100%)" }}
              >
                Redeem Offer
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersTab;
