import { MapPin } from "lucide-react";

const sponsors = [
  {
    name: "Hyundai UAE",
    location: "Dubai, UAE",
    logo: "http://92.205.234.176:7000/logo/image-2-1771047770132.png",
  },
  {
    name: "Porsche Centre Dubai",
    location: "Dubai, UAE",
    logo: "http://92.205.234.176:7000/logo/image-2-1771047770132.png",
  },
  {
    name: "Audi Abu Dhabi",
    location: "Abu Dhabi, UAE",
    logo: "http://92.205.234.176:7000/logo/image-2-1771047770132.png",
  },
  {
    name: "Ford Middle East",
    location: "Dubai, UAE",
    logo: "http://92.205.234.176:7000/logo/image-2-1771047770132.png",
  },
];

const SponsorPlacementsTab = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-bold text-white">Our Sponsors</h3>
      <p className="text-sm text-white/40">Brands supporting the ALPHA community</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sponsors.map((s) => (
        <div
          key={s.name}
          className="bg-navy-light rounded-lg border border-white/10 p-5 flex items-center gap-4"
        >
          {/* Logo */}
          <img
            src={s.logo}
            alt={s.name}
            className="w-12 h-12 object-contain rounded"
          />

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold">{s.name}</h4>
            <div className="flex items-center gap-1 text-xs text-white/60">
              <MapPin className="w-3 h-3" />
              {s.location}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SponsorPlacementsTab;