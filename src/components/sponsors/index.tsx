import React from "react";
import BannerHeader from "../ui/BannerHeader";
import OurSponsor from "../home/Sponsor";
import SponsorFacility from "./SponsorFacility";

function Sponsor() {
  return (
    <>
      <BannerHeader title="Our Sponsors" description="Partners in Excellence" />
      <SponsorFacility />
      <OurSponsor />
    </>
  );
}

export default Sponsor;
