
import { apiFetch } from "@/lib/api/api-fech";
import { ApiResponse, ITeamContact, Offer, Pagination, Partner } from "@/types/main";
import ContactsTab from "./components/Contact";


export default async function Page({ searchParams }: any) {
  const page = searchParams.page || "1";
  const searchTerm = searchParams.searchTerm || "";

  const params = new URLSearchParams({
    page,
    limit: "100",
    searchTerm
  });

  const teamContact = (await apiFetch(
    "/team-contact?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["team-contact"] },
    },
    "server"
  )) as ApiResponse<ITeamContact>;

  const data: ITeamContact[] = teamContact?.data || [];
  const pagination = teamContact?.pagination;

  return (
    <div>
      <ContactsTab
        data={data}
      />
    </div>
  );
}