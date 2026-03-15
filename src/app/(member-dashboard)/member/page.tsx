import { apiFetch } from "@/lib/api/api-fech";
import MemberOverviewTab from "./components/MemberOverview";

interface OverviewData {
  availableOffer: number;
  upcomingEvent: number;
  favouriteOffer: number;
}

interface ApiResponse<T> {
  data: T;
}

interface INotification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: Props) {
  // Await searchParams for Next.js 15
  const paramsObj = await searchParams;
  const page = paramsObj?.page || "1";

  // Prepare query params
  const notificationParams = new URLSearchParams({
    page,
    limit: "4",
  });

  // Run both API calls in parallel
  const [feedback, notifications] = await Promise.all([
    apiFetch("/feedback/overview", { cache: "force-cache" }, "server") as Promise<ApiResponse<OverviewData>>,
    apiFetch("/notification?" + notificationParams.toString(), { 
      method: "GET", 
      cache: "force-cache", 
      next: { tags: ["notification"] } 
    }, "server") as Promise<ApiResponse<INotification[]>>
  ]);

  const notificationData: INotification[] = notifications?.data || [];

  return (
    <div>
      <MemberOverviewTab
        data={feedback.data}
        notifications={notificationData}
      />
    </div>
  );
}