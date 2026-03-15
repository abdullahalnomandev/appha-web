import { apiFetch } from "@/lib/api/api-fech";
import { ApiResponse, Event } from "@/types/main";
import EventsTab from "./component.tsx/Event";

interface Props {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const paramsObj = await searchParams;

  const page = paramsObj?.page || "1";

  const params = new URLSearchParams({
    page,
    limit: "5",
    sort: "-eventDate",
  });

  const event = (await apiFetch(
    "/event?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["event"] },
    },
    "server"
  )) as ApiResponse<Event[]>;

  const data: any = event?.data || [];

  return (
    <div>
      <EventsTab data={data} />
    </div>
  );
}