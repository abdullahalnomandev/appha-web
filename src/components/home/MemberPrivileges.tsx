import Image from "next/image";
import { Award, Shield, Users, TrendingUp } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
// Member Privileges Data
const privilegeCards = [
  {
    id: 1,
    title: "Beach Clubs",
    description: "Exclusive access to premium beach clubs",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/17/7f/a5/big-beach.jpg?w=900&h=500&s=1", // Add your actual image path
    icon: "🏖️",
  },
  {
    id: 2,
    title: "Gym & Fitness Center",
    description: "Access to top-tier fitness facilities",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFpfghMbGvKTZKuokfALFrdjXb0EFE9PgOtg&s", // Add your actual image path
    icon: "💪",
  },
  {
    id: 3,
    title: "Restaurants",
    description: "Exclusive dining at premier restaurants",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhA_M1N3kSBlDx8MW4SV7kcE1HUM71onoDdg&s", // Add your actual image path
    icon: "🍽️",
  },
  {
    id: 4,
    title: "Social Events",
    description: "Networking and lifestyle events",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSCGaIl7pHNeRpAi__4DNz66mXqJTK1_KU-Q&s", // Add your actual image path
    icon: "🎊",
  },
];

// Why Choose ALPHA Data
const whyChooseFeatures = [
  {
    id: 1,
    icon: Award,
    title: "Excellence",
    description:
      "We deliver the same high standards our members provide to their customers",
  },
  {
    id: 2,
    icon: Shield,
    title: "Exclusivity",
    description:
      "Curated partnerships and experiences for automotive professionals",
  },
  {
    id: 3,
    icon: Users,
    title: "Community",
    description:
      "Building meaningful connections within the automotive industry",
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Value",
    description: "Genuine benefits that enhance your lifestyle and career",
  },
];



const MemberBenefits = () => {
  return (
    <>
      {/* Member Privileges Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          {/* Section Header */}
          <div className="text-center mb-12">
            <SectionHeading>Member Privileges</SectionHeading>
            <p className="text-base text-black max-w-3xl mx-auto leading-relaxed">
              Our privileges are curated to reflect the lifestyles and
              expectations of senior automotive professionals. Through our
              Trusted Partner Network, you will receive access to the best and
              most exclusive experiences.
            </p>
          </div>

          {/* Privilege Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {privilegeCards.map((card) => (
              <div
                key={card.id}
                className="relative h-[280px] w-full  rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay Gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(360deg, #162135 0%, rgba(64, 97, 155, 0) 100%)",
                    }}
                  ></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  {/* Icon */}
                  <div className="text-3xl mb-3">{card.icon}</div>

                  {/* Title */}
                  <h3
                    className="text-white font-semibold text-lg mb-2"
                    style={{ fontFamily: "Poppins" }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-white/90 text-sm leading-relaxed"
                    style={{ fontFamily: "Poppins" }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ALPHA Section */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          {/* Section Header */}
          <div className="text-center mb-12">
            <SectionHeading>Why Choose ALPHA</SectionHeading>
            <p className="text-base text-[#666666]">
              Built for automotive professionals, by automotive
              professionals{" "}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseFeatures.map((feature) => {
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
    </>
  );
};

export default MemberBenefits;
