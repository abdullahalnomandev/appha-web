import { apiFetch } from "@/lib/api/api-fech";
import { ApiResponse, INotification, Pagination } from "@/types/main";
import NotificationsTab from "./components/NotificationTab";

interface Props {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
  }>;
}

// Typed API response including optional pagination
interface NotificationApiResponse extends ApiResponse<INotification> {
  pagination?: Pagination;
}

export default async function Page({ searchParams }: Props) {
  // Await searchParams for Next.js 15
  const paramsObj = await searchParams;
  const page = paramsObj?.page || "1";

  const params = new URLSearchParams({
    page,
    limit: "10",
  });

  // Fetch notifications
  const notificationResponse = (await apiFetch(
    "/notification?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["notification"] },
    },
    "server"
  )) as NotificationApiResponse;

  const data: INotification[] = notificationResponse?.data || [];
  const pagination: Pagination =
    notificationResponse?.pagination || { total: 0, limit: 10, page: 1, totalPage: 0 };

  return (
    <div>
      <NotificationsTab data={data} pagination={pagination} />
    </div>
  );
}