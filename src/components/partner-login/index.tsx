import BannerHeader from "../ui/BannerHeader";
import PartnerLoginContactInfo from "./PartnerLogin";
import ContactInfo from "./PartnerLogin";
const PartnerLogin = () => {
  return (
    <div>
      <div className="hidden md:block">
        <BannerHeader
          title="Partner Login"
          description="Access Your Partner Portal."
        />
      </div>
      <PartnerLoginContactInfo />
    </div>
  );
};

export default PartnerLogin;
