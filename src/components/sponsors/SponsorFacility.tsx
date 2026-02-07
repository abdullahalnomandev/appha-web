import React from "react";
import { ChartSpline } from "lucide-react";

const sponsorFeatures = [
  {
    id: 1,
    icon: ChartSpline,
    title: "Targeted Audience",
    description: "Access to automotive professionals and leaders in the UAE",
  },
  {
    id: 2,
    icon: ChartSpline,
    title: "Brand Visibility",
    description: "Dedicated presence on ALPHA website and members portal",
  },
  {
    id: 3,
    icon: ChartSpline,
    title: "Curated Partnership",
    description: "Quality-focused, long-term value partnerships",
  },
];
function SponsorFacility() {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        {/* Features Grid */}
        <p className="text-black text-base text-center">
          ALPHA is proud to partner with leading brands that share our
          commitment to excellence and quality. Our sponsors play a vital role
          in delivering exceptional experiences and benefits to our members.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-12 gap-8">
          {sponsorFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center hover:scale-105 p-8 rounded-xl bg-white border transition-all duration-300 "
                style={{ boxShadow: "0px 4px 6px 2px #00000014" }}
              >
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-[#C9A229]/20 flex items-center justify-center mb-6">
                  <IconComponent
                    className="w-8 h-8 text-[#C9A229]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#666666] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SponsorFacility;
