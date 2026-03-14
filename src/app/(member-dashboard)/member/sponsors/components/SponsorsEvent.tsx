import { getImage } from "@/lib/api/api-fech";
import { Sponsor } from "@/types/main";
import { MapPin } from "lucide-react";


const SponsorPlacementsTab = ({ data }: { data: Sponsor[] }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-bold text-black">Our Sponsors</h3>
      <p className="text-sm text-gray-600">Brands supporting the ALPHA community</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((s) => (
        <div
          key={s._id}
          className=" rounded-lg border border-gray-200 p-5 flex items-center gap-4 shadow-sm"
        >
          {/* Logo */}
          <img
            src={getImage(s.logo)}
            alt={s.title}
            className="w-12 h-12 object-contain rounded"
          />

          {/* Info */}
          <div>
            <h4 className="text-gray-900 font-semibold">{s.title}</h4>
            <div className="flex items-center gap-1 text-xs text-gray-500">
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