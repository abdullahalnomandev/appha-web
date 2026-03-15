import { apiFetch } from "@/lib/api/api-fech";
import { ApiResponse, Sponsor, Pagination } from "@/types/main";
import SponsorPlacementsTab from "./components/SponsorsEvent";

interface Props {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
  }>;
}

// Typed API response for Sponsor
interface SponsorApiResponse extends ApiResponse<Sponsor> {
  pagination?: Pagination;
}

export default async function Page({ searchParams }: Props) {
  // Await searchParams for Next.js 15
  const paramsObj = await searchParams;
  const page = paramsObj?.page || "1";

  const params = new URLSearchParams({
    page,
    limit: "100",
  });

  // Fetch sponsors
  const getSponsor = (await apiFetch(
    "/sponsor?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["sponsor"] },
    },
    "server"
  )) as SponsorApiResponse;

  const data: Sponsor[] = getSponsor?.data || [];
  const pagination = getSponsor?.pagination || { total: 0, limit: 100, page: parseInt(page), totalPage: 0 };

  return (
    <div>
      <SponsorPlacementsTab data={data} />
    </div>
  );
}