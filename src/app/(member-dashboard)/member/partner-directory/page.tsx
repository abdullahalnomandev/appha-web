import { apiFetch } from "@/lib/api/api-fech";
import PartnerDirectory from "./components/PartnerDirectory";
import { Pagination, Partner } from "@/types/main";

interface Props {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
  }>;
}

// Define the API response type
interface PartnerApiResponse {
  data: Partner[];
  pagination?: Pagination; // optional total count if API provides it
}

export default async function Page({ searchParams }: Props) {
  // Await searchParams for Next.js 15
  const paramsObj = await searchParams;
  const page = paramsObj?.page || "1";
  const searchTerm = paramsObj?.searchTerm || "";

  const params = new URLSearchParams({
    page,
    limit: "10",
    searchTerm,
    partnerShipStatus: "active",
  });

  // Fetch partner applications
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
  const pagination = getPartnerApplication?.pagination || {
    total: 0,
    limit: 10,
    page: parseInt(page),
    totalPage: 0,
  };

  return (
    <div>
      <PartnerDirectory
        data={data}
        total={pagination.total}
        currentPage={parseInt(page)}
        searchTerm={searchTerm}
      />
    </div>
  );
}