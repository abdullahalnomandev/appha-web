
import { apiFetch } from "@/lib/api/api-fech";
import { ApiResponse, Offer, Pagination, Partner, Sponsor } from "@/types/main";
import SponsorPlacementsTab from "./components/SponsorsEvent";

interface Props {
  searchParams: {
    page?: string;
    searchTerm?: string;
  };
}

// Define the API response type
interface SponsorApiResponse {
  data: Partner[];
  pagination?: Pagination; // optional total count if API provides it
}

export default async function Page({ searchParams }: Props) {
  const page = searchParams.page || "1";

  const params = new URLSearchParams({
    page,
    limit: "100"

  });

  const getSponsor = (await apiFetch(
    "/sponsor?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["sponsor"] },
    },
    "server"
  )) as ApiResponse<Sponsor>;

  const data: Sponsor[] = getSponsor?.data || [];
  const pagination = getSponsor?.pagination;

  console.log("data", data);

  return (
    <div>
      <SponsorPlacementsTab
        data={getSponsor?.data || []}
      />
    </div>
  );
}