import { apiFetch } from "@/lib/api/api-fech";
import PartnerDirectory from "./components/PartnerDirectory";
import { Pagination, Partner } from "@/types/main";

interface Props {
  searchParams: {
    page?: string;
    searchTerm?: string;
  };
}

// Define the API response type
interface PartnerApiResponse {
  data: Partner[];
  pagination?: Pagination; // optional total count if API provides it
}

export default async function Page({ searchParams }: Props) {
  const page = searchParams.page || "1";
  const searchTerm = searchParams.searchTerm || "";

  const params = new URLSearchParams({
    page,
    limit: "10",
    searchTerm,
    partnerShipStatus: "active",
  });

  // Tell TypeScript what type to expect
  const getPartnerApplication = (await apiFetch(
    "/partner-request?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["getPartnerApplication"] },
    },
    "server"
  )) as PartnerApiResponse;

  // Safely extract data
  const data: Partner[] = getPartnerApplication?.data || [];
  const pagination = getPartnerApplication?.pagination ;

  console.log("getPartnerApplication", pagination);

  return (
    <div>
      <PartnerDirectory
        data={data}
        total={pagination?.total || 0}
        currentPage={parseInt(page)}
        searchTerm={searchTerm}
      />
    </div>
  );
}