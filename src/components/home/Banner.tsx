import Link from "next/link";
import Image from "next/image";
import alpha from "@/assets/image 2.png";
import MemberBenefits from "./MemberPrivileges";
import OurSponsor from "./Sponsor";


const Banner = () => {


  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative md:min-h-screen py-10 md:py-0 flex items-center justify-center overflow-hidden select-none"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #162247 0%, #0C1223 100%)",
        }}
      >
        {/* Content */}
        <div className="container-main max-w-[1300px] mx-auto text-center relative z-10 px-4">
          {/* Background Image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url('/assets/bg/image-bg.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.1, // ✅ only background opacity
              // transform: "scale(0.9)",
            }}
          />
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="text-center">
              <Image
                src={alpha}
                alt="Alpha Logo"
                width={256}
                height={128}
                className="object-contain"
                draggable={false}
              />
            </div>
          </div>

          {/* Main Heading */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] font-bold text-[#D7A859] mb-6 text-center px-4 select-text"
            style={{ lineHeight: "148%" }}
          >
            "Delivering Excellence to Those
            <br className="hidden md:block" /> Who Drive It"
          </h2>

          {/* Subheading */}
          <p className="text-[#FEFEFE] mb-12 mx-auto px-4 text-xl  sm:text-3xl font-normal not-italic select-text">
            An exclusive social and lifestyle club for automotive professionals
            and leaders
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-white rounded-md hover:bg-white/10 transition-all duration-300 text-sm tracking-wider select-text"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Member Privileges */}
      <MemberBenefits />
      <OurSponsor />
    </div>
  );
};

export default Banner;
