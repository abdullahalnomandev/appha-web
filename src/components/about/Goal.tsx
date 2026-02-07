import React from "react";
import { Award, ShieldCheck, Users, TrendingUp } from "lucide-react";
export const coreValuesData = [
  {
    id: "mission",
    title: "Mission", 
    description:
      "To deliver excellence to both our members and partners by creating a trusted, private network for automotive leaders through meaningful, high-value relationships..",
  },
  {
    id: "vision",
    title: "Vision",
    description:
      "To be the UAE's most trusted private network for automotive leaders."
  },
  {
    id: "goal",
    title: "Goal",
    description:
      "Building meaningful connections within the automotive industry.",
    type:'list',
    list:[
      'Curate premium, relevant partnerships',
      'Deliver exceptional member experiences',
      'Create long-term value for partners',
      'Build a respected automotive leadership community'
    ]
  },
];
function Goals() {
  return (
    <section className=" py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValuesData.map((feature) => {

            return (
              <div
                key={feature.id}
                className="
                  flex flex-col
                  p-8 rounded-xl
                  bg-[#FEFEFE] 
                  hover:scale-105 transition-all duration-300
                  md:max-w-[350px]
                  mx-auto
                "
                style={{ borderTop: "7px solid #D7A859", boxShadow: "0px 4px 6px 2px #00000014" }}
              >
                {/* Icon */}

                {/* Title */}
                <h3 className="text-xl mb-2 text-inherit font-extrabold">
                  {feature.title}
                </h3>

                {/* Description */}
                <div className="text-sm text-[#000000]/70 leading-relaxed w-full">
                  {feature.type === 'list' ? (
                    <ul className="list-disc list-inside">
                      {feature.list.map((item, index) => (
                        <li key={index} className="text-inherit">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{feature.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Goals;
