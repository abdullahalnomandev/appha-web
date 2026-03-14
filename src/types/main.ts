export interface IPMember {
    _id: string;
    profileImage: string;
    membershipType: string;
    name: string;
    email: string;
    phone: string;
    membershipStatus: string;
    expireId: string; // ISO date string
    jobTitle: string;
    organizationName: string;
    dateOfBirth: string; // ISO date string
    nationality: string;
    countryOfResidence: string;
    residenceAddress: string;
    industrySector: string;
    yearsOfExperience: number;
    currentEmployer: string;
    workLocation: string;
    annualGrossSalary: number;
    benefitsAndLifestyleInterests: string[];
    image: string[];
    logo: string[];
    confirmAcknowledgement: boolean;
    confirmAgreement: boolean;
    family: {
        children: any[]; // can define a separate type if needed
    };
    familyMembers: any[]; // can define a separate type if needed
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    memberShipId: string;
}

export interface Partner {
    _id: string;
    companyName: string;
    profileImage: string;
    industry: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    website: string;
    message: string;
    partnerShipStatus: string; // e.g., "active" | "pending" etc. could be enum
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    partnerShipId: string;
}

export interface Pagination {
    total: number;
    limit: number;
    page: number;
    totalPage: number;
}


export interface Offer {
  _id: string;
  name: string;
  user: {
    _id: string;
    name: string;
  };
  title: string;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  image: string[];
  description: string;
  discount: {
    enable: boolean;
    value: number;
  };
  category: {
    _id: string;
    name: string;
  };
  status: "pending" | "approved" | "rejected"; // you can expand as needed
  published: boolean;
  isFavourite: boolean;
}

export interface Event {
  _id: string;
  name: string;
  title: string;
  image: string;
  location: string;
  description: string; // HTML string
  eventDate: string;   // ISO date string
  eventTime: string;   // e.g. "13:00"
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
  eventCount: number;
  joinStatus:"time_exceeded" | "ongoing" |  "pending" | "confirmed" | "cancelled"
 }

 export interface Sponsor {
  _id: string;
  logo: string;
  title: string;
  location: string;
  publishing: boolean;
};

export interface ApiResponse <T> {
  data: T[];
  pagination?: Pagination; 
}

