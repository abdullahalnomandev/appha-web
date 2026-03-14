import { apiFetch } from "@/lib/api/api-fech";
import { ApiResponse, Offer, Pagination, Partner } from "@/types/main";
import OffersTab from "./components/OfferTab";

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
    searchTerm
  });

  const getExclusiveOffer = (await apiFetch(
    "/exclusive-offer?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["exclusive-offer"] },
    },
    "server"
  )) as ApiResponse<Offer>;

  const data: Offer[] = getExclusiveOffer?.data || [];
  const pagination = getExclusiveOffer?.pagination;

  console.log("data", data);

  return (
    <div>
      <OffersTab
        data={data}
        total={pagination?.total || 0}
        currentPage={parseInt(page)}
        searchTerm={searchTerm}
      />
    </div>
  );
}