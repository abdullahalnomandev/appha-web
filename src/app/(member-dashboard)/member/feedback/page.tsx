import { apiFetch } from "@/lib/api/api-fech";
import FeedbackTab from "./components/Feedback";
import { IPMember } from "@/types/main"; // Use Feedback type if needed


// API response type for users
interface UserApiResponse {
  data: IPMember[]; 
}

export default async function Page({ searchParams }: any) {
  const searchTerm = searchParams.searchTerm || "";

  const params = new URLSearchParams({
    searchTerm,
  });

  // Fetch user data from API
  const getUsers = (await apiFetch(
    "/user/all-partner-users?" + params.toString(),
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["feedback"] },
    },
    "server"
  )) as UserApiResponse;

  const data: IPMember[] = (getUsers?.data as any)?.data || [];

  return (
    <div>
      <FeedbackTab
        data={data as any}
        searchTerm={searchTerm}
      />
    </div>
  );
}