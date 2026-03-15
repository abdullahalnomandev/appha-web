import { apiFetch } from "@/lib/api/api-fech";
import { ApiResponse, Offer, Pagination } from "@/types/main";
import OffersTab from "./components/OfferTab";

interface Props {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
  }>;
}

// Correct API response type for Offer
interface OfferApiResponse extends ApiResponse<Offer> {
  pagination?: Pagination;
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
  });

  // Fetch offers
  const getExclusiveOffer = (await apiFetch(
    "/exclusive-offer?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["exclusive-offer"] },
    },
    "server"
  )) as OfferApiResponse;

  const data: Offer[] = getExclusiveOffer?.data || [];
  const pagination = getExclusiveOffer?.pagination;

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