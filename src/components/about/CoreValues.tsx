import React from "react";
import { Award, ShieldCheck, Users, TrendingUp } from "lucide-react";
export const coreValuesData = [
  {
    id: "excellence",
    title: "Excellence",
    description:
      "We deliver the same high standards our members provide to their customers.",
    icon: Award,
  },
  {
    id: "exclusivity",
    title: "Exclusivity",
    description:
      "Curated partnerships and experiences for automotive professionals.",
    icon: ShieldCheck,
  },
  {
    id: "community",
    title: "Community",
    description:
      "Building meaningful connections within the automotive industry.",
    icon: Users,
  },
  {
    id: "value",
    title: "Value",
    description: "Genuine benefits that enhance your lifestyle and career.",
    icon: TrendingUp,
  },
];
function CoreValues() {
  return (
    <section className="bg-[#162135] py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Core Values
          </h2>
          <p className="text-sm text-white/70 mt-2">What drives us forward</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValuesData.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="
                  flex flex-col items-center text-center
                  p-8 rounded-xl
                  bg-[#0F1A2C] border border-white/10
                  hover:scale-105 transition-all duration-300
                "
                style={{ boxShadow: "0px 4px 6px 2px #FFFFFF14" }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-[#C9A229]/20 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#C9A229]" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/70 leading-relaxed">
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

export default CoreValues;
