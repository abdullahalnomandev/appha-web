"use client";
import { Snowflake, Clock } from "lucide-react";
import { toast } from "sonner";

const seasonalOffers = [
  { id: 1, title: "Summer Beach Pass", partner: "Azure Beach Club", expiry: "Sep 30, 2026", description: "All-summer unlimited beach access with reserved cabana.", season: "Summer 2026" },
  { id: 2, title: "Ramadan Iftar Package", partner: "La Maison Restaurant", expiry: "Apr 15, 2026", description: "Exclusive Iftar dining experience for ALPHA members and guests.", season: "Ramadan 2026" },
  { id: 3, title: "Eid Celebration Detailing", partner: "AutoSpa Detailing", expiry: "Apr 20, 2026", description: "Get your car Eid-ready with a premium detail at 30% off.", season: "Eid Al Fitr" },
];

const SeasonalOffersTab = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-bold text-white">Seasonal Offers</h3>
      <p className="text-sm text-white/40">Exclusive deals tied to holidays and seasons</p>
    </div>

    <div className="space-y-3">
      {seasonalOffers.map((o) => (
        <div key={o.id} className="bg-navy-light rounded-lg border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Snowflake className="w-4 h-4 text-blue-400" />
              <h4 className="text-white font-semibold">{o.title}</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">{o.season}</span>
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

export default SeasonalOffersTab;
