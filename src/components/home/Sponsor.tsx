import Image from "next/image";
import SectionHeading from "../ui/SectionHeading";

const sponsors = [
  {
    id: 1,
    name: "Sponsor 1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFpfghMbGvKTZKuokfALFrdjXb0EFE9PgOtg&s", // Add your actual image path
  },
  {
    id: 2,
    name: "Sponsor 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSCGaIl7pHNeRpAi__4DNz66mXqJTK1_KU-Q&s", // Add your actual image path
  },
  {
    id: 3,
    name: "Sponsor 3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhA_M1N3kSBlDx8MW4SV7kcE1HUM71onoDdg&s", // Add your actual image path
  },
];
function OurSponsor() {
  return (
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          {/* Section Header */}
          <div className="text-center mb-12">
            <SectionHeading>Our Sponsors</SectionHeading>
            <p className="text-base text-[#666666]">
              We are grateful for the support of our sponsors
            </p>
          </div>

          {/* Sponsors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 bg-[#F5F5F5] py-12 px-6 lg:px-20">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="relative flex items-center justify-center hover:scale-105 transform transition-all duration-300 p-6 h-32 rounded-xl bg-white  hover:shadow-md  hover:-translate-y-0.5"
              >
                <Image
                  src={sponsor.image}
                  alt={sponsor.name}
                  width={160}
                  height={80}
                  className="object-contain filter cursor-pointer grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default OurSponsor