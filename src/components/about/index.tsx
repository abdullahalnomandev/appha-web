import { Suspense, lazy } from "react";
import BannerHeader from "../ui/BannerHeader";
import CoreValues from "./CoreValues";
import Goals from "./Goal";
import AboutContent from "./AboutContent";

export default function About() {
  return (
    <div className="mx-auto bg-white text-black">
      <BannerHeader title="About Us" description="“Delivering Excellence to Those Who Drive It.”" />
      {/* <Suspense fallback={<Spinner />}> */}
        <AboutContent />
      {/* </Suspense> */}
      <CoreValues />
      <Goals />
    </div>
  );
}
