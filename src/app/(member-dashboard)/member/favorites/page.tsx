import { apiFetch } from "@/lib/api/api-fech";
import { ApiResponse, Offer, Pagination } from "@/types/main";
import FavoritesTab from "./components/FavoriteTab";

interface Props {
  searchParams: {
    page?: string;
    searchTerm?: string;
  };
}

interface OfferApiResponse extends ApiResponse<Offer> {
  pagination?: Pagination; // optional if API provides it
}

export default async function Page({ searchParams }: Props) {
  const page = searchParams.page || "1";

  const params = new URLSearchParams({
    page,
    limit: "100",
  });

  // Fetch offers
  const offerResponse = (await apiFetch(
    "/exclusive-offer/all/favourite?" + params.toString(),
    {
      method: "GET",
      cache: "no-store",
      next: { tags: ["favorites"] },
    },
    "server"
  )) as OfferApiResponse;

  const data: Offer[] = offerResponse?.data || [];
  const pagination = offerResponse?.pagination;

  return (
    <div>
      <FavoritesTab
        data={data}
      />
    </div>
  );
}