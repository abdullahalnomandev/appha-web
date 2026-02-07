import BannerHeader from "../ui/BannerHeader";
import { PartnerBenefit } from "./PartnerBenefit";
import PartnerForm from "./PartnerForm";
const partnerReceives = [
  "Dedicated partner presence on the ALPHA website and members-only platform, including logo, brand description, and imagery",
  "Secure partner access to manage and update your brand profile, contact information, and content",
  "Opportunities to share exclusive offers, benefits, and promotions directly with members via the platform and selected ALPHA communication channels",
  "All partnerships are carefully curated to ensure relevance, quality, and long-term value for both our members and our partners",
];
const Partners = () => {
  return (
    <div>
      <BannerHeader
        title="Partner with ALPHA"
        description="Connect with Automotive Leaders and Professionals."
      />
      <div className="container-main py-10 space-y-12 text-black mx-auto max-w-[1300px]">
        <h1 className="text-3xl font-extrabold mb-6">Partnering with ALPHA</h1>
        <p className="text-black text-base max-w-[950px]">
          At ALPHA, we collaborate with a select group of partners whose
          services and offerings align with the lifestyle, expectations, and
          standards of our members. We value partners who deliver quality,
          relevance, and genuine benefit to the automotive professionals and
          leaders within our network.
        </p>
        <p className="text-black text-base max-w-[950px]">
          As an ALPHA partner, your brand gains access to a highly targeted
          membership of automotive professionals and leaders, along with their
          families, based in the UAE. Our members value trusted recommendations,
          premium experiences, and meaningful engagement over traditional
          advertising.
        </p>
        <PartnerBenefit />
        {/* What Partners Receive */}
        <section className="py-16 bg-background">
          <div className="container-main max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-6 text-center">
              What Partners Receive
            </h2>
            <div className="bg-navy rounded-lg text-center p-8">
              <ul className="space-y-4">
                {partnerReceives.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-white/90"
                  >
                    <span className="text-amber mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <PartnerForm />
      </div>
    </div>
  );
};

export default Partners;
