import { ChartSpline } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Image from "next/image";

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
  {
    id: 4,
    icon: ChartSpline,
    title: "Direct Engagement",
    description: "Direct interaction with members for personalized support",
  },
];

export const PartnerBenefit = () => {
  return (
      <section className="py-20 ">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          {/* Section Header */}
          <div className="text-center mb-12">
            <SectionHeading>Partnership Benefits</SectionHeading>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsorFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="flex flex-col items-center text-center hover:scale-105 p-8 rounded-xl bg-white transition-all duration-300 "
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
};
