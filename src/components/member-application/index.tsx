import BannerHeader from "../ui/BannerHeader";
import MemberApplicationForm from "./MemberAppllicationForm";

const MemberApplication = () => {
  return (
    <div>
      <BannerHeader title="Membership Application" description="Join the premier automotive professionals network." />
      <MemberApplicationForm />
    </div>
  );
};

export default MemberApplication;
