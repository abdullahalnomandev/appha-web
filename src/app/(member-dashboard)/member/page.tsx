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
  searchParams?: { page?: string };
}

export default async function Page({ searchParams }: Props) {
  // Fetch feedback overview
  const feedback = await apiFetch(
    "/feedback/overview",
    { cache: "force-cache" },
    "server"
  ) as ApiResponse<OverviewData>;

  // Determine pagination
  const page = searchParams?.page || "1";
  const params = new URLSearchParams({
    page,
    limit: "4",
  });

  // Fetch notifications
  const notifications = await apiFetch(
    "/notification?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["notification"] },
    },
    "server"
  ) as ApiResponse<INotification[]>;


  return (
    <div>
      <MemberOverviewTab data={feedback.data} notifications={notifications.data} />
      {/* You can use notification.data here if needed */}
    </div>
  );
}