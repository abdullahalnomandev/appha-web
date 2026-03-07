import { Megaphone, ExternalLink } from "lucide-react";

const sponsors = [
  { name: "Hyundai UAE", tier: "Platinum", description: "Official automotive partner — exclusive test drive events and member pricing.", website: "#" },
  { name: "Porsche Centre Dubai", tier: "Gold", description: "Premium driving experiences and priority delivery for ALPHA members.", website: "#" },
  { name: "Audi Abu Dhabi", tier: "Gold", description: "Special financing rates and VIP service appointments.", website: "#" },
  { name: "Ford Middle East", tier: "Silver", description: "Fleet management solutions and corporate member benefits.", website: "#" },
];

const tierColors: Record<string, string> = {
  Platinum: "bg-purple-500/20 text-purple-400",
  Gold: "bg-amber/20 text-amber",
  Silver: "bg-gray-400/20 text-gray-300",
};

const SponsorPlacementsTab = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-bold text-white">Our Sponsors</h3>
      <p className="text-sm text-white/40">Brands supporting the ALPHA community</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sponsors.map((s) => (
        <div key={s.name} className="bg-navy-light rounded-lg border border-white/10 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber" />
              <h4 className="text-white font-semibold">{s.name}</h4>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tierColors[s.tier] || ""}`}>{s.tier}</span>
          </div>
          <p className="text-sm text-white/60 mb-3">{s.description}</p>
          <a href={s.website} className="flex items-center gap-1 text-xs text-amber hover:underline">
            Visit Website <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default SponsorPlacementsTab;
