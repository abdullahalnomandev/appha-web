'use client';
import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const industrySectors = [
  "Automotive Sales",
  "Automotive Service",
  "Parts & Accessories",
  "Insurance",
  "Finance & Leasing",
  "Other",
];

const salaryRanges = [
  "Below 20,000 AED",
  "20,000 - 40,000 AED",
  "40,000 - 60,000 AED",
  "60,000 - 80,000 AED",
  "Above 80,000 AED",
];

const benefitInterests = [
  "Social Networking Events",
  "Sports & Fitness",
  "Family and Leisure Activities",
  "Travel & Hospitality",
  "Automotive & Motorsport",
  "Lifestyle & Wellness",
];

const Membership = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    company: "",
    email: "",
    mobile: "",
    dob: "",
    nationality: "",
    countryOfResidence: "",
    residentialAddress: "",
    industrySector: "",
    yearsOfExperience: "",
    currentEmployer: "",
    workLocation: "",
    annualSalary: "",
    membershipType: "individual",
    interests: [] as string[],
    confirmAccuracy: false,
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.confirmAccuracy || !formData.agreeTerms) {
      toast.error("Please confirm the acknowledgments");
      return;
    }
    toast.success("Membership application submitted successfully!");
  };

  return (
      <section className="py-16 bg-background">
        <div className="container-main max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Primary Member Information */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                Primary Member Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Job Title / Role*</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Company / Organization*</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Email Address*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Mobile Number*</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Date of Birth*</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Nationality*</label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Country of Residence*</label>
                  <input
                    type="text"
                    name="countryOfResidence"
                    value={formData.countryOfResidence}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Residential Address*</label>
                  <textarea
                    name="residentialAddress"
                    value={formData.residentialAddress}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="form-input resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Professional Background */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                Professional Background
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Industry Sector*</label>
                  <select
                    name="industrySector"
                    value={formData.industrySector}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select sector</option>
                    {industrySectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Years of Industry Experience*</label>
                  <input
                    type="text"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Current Employer / Business Name*</label>
                  <input
                    type="text"
                    name="currentEmployer"
                    value={formData.currentEmployer}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Work Location (City or Location)*</label>
                  <input
                    type="text"
                    name="workLocation"
                    value={formData.workLocation}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Annual Gross Salary (AED)*</label>
                  <select
                    name="annualSalary"
                    value={formData.annualSalary}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select sector</option>
                    {salaryRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Membership Type */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                Membership type
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="membershipType"
                    value="individual"
                    checked={formData.membershipType === "individual"}
                    onChange={handleChange}
                    className="w-4 h-4 accent-amber"
                  />
                  <span className="text-foreground">Individual Membership</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="membershipType"
                    value="family"
                    checked={formData.membershipType === "family"}
                    onChange={handleChange}
                    className="w-4 h-4 accent-amber"
                  />
                  <span className="text-foreground">Couple / Family Membership</span>
                </label>
              </div>
            </div>

            {/* Benefits & Lifestyle Interests */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                Benefits & Lifestyle Interests
              </h2>
              
              <div className="space-y-3">
                {benefitInterests.map(interest => (
                  <label key={interest} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="w-4 h-4 accent-amber"
                    />
                    <span className="text-foreground">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Required Documentation */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                Required Documentation
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-amber transition-colors">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Emirates ID (Front & Back)</p>
                  <p className="text-sm text-amber">Click to Upload</p>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-amber transition-colors">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Passport Photo (Primary Member)</p>
                  <p className="text-sm text-amber">Click to Upload</p>
                </div>
              </div>
            </div>

            {/* Membership Acknowledgment */}
            <div className="bg-muted rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Membership Acknowledgment
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="confirmAccuracy"
                    checked={formData.confirmAccuracy}
                    onChange={handleChange}
                    className="w-4 h-4 accent-amber mt-1"
                  />
                  <span className="text-foreground text-sm">
                    I confirm that the information provided is accurate and complete
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-4 h-4 accent-amber mt-1"
                  />
                  <span className="text-foreground text-sm">
                    I have read & agree to the ALPHA Membership terms & condition
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              Submit Application
            </button>
          </form>
        </div>
      </section>
  );
};

export default Membership;
