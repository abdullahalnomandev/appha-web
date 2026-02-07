import BannerHeader from "../ui/BannerHeader";
import AboutContent from "./AboutContent";
import CoreValues from "./CoreValues";
import Goals from "./Goal";

export default function About() {
  return (
    <div className="mx-auto bg-white text-black">
      <BannerHeader title="About Us" description="“Delivering Excellence to Those Who Drive It.”" />
      <AboutContent />
      <CoreValues />
      <Goals />
    </div>
  );
};