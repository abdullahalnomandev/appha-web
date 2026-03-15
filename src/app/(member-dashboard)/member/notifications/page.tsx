import { apiFetch } from "@/lib/api/api-fech";
import { ApiResponse, INotification, Pagination } from "@/types/main";
import NotificationsTab from "./components/NotificationTab";

interface Props {
  searchParams?: {
    page?: string;
    searchTerm?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const page = searchParams?.page || "1";

  const params = new URLSearchParams({
    page,
    limit: "10",
  });

  const notification = (await apiFetch(
    "/notification?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["notification"] },
    },
    "server"
  )) as ApiResponse<INotification[]>;

  const data: any[] = notification?.data || [];
  const pagination: Pagination =
    notification?.pagination || { total: 0, limit: 0, page: 0, totalPage: 0 };

  console.log("data", data);

  return (
    <div>
      <NotificationsTab data={data} pagination={pagination} />
    </div>
  );
}