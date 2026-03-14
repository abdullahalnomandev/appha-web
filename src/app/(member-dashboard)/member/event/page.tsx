import { apiFetch } from "@/lib/api/api-fech";
import { ApiResponse, Event, Offer, Pagination, Partner } from "@/types/main";
import EventsTab from "./component.tsx/Event";

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

  const params = new URLSearchParams({
    page,
    limit: "5",
    sort: "-eventDate"
  });

  const event = (await apiFetch(
    "/event?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["event"] },
    },
    "server"
  )) as ApiResponse<Event>;

  const data: Event[] = event?.data || [];
  // const pagination = event?.pagination;

  // console.log("data", data);

  return (
    <div>
      <EventsTab
        data={data}
      />
    </div>
  );
}