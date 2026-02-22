// app/partner-dashboard/page.tsx
import PartnerDashboard from "@/components/partnerDashboard";
import { Offer } from "@/components/partnerDashboard/ManageOffer/ManageOffersTab";
import { apiFetch } from "@/lib/api/api-fech";

export default async function PartnerDashboardHomePage() {
  try {
    // Query params
    const offersQuery = new URLSearchParams({ page: "1", limit: "150" });
    const categoriesQuery = new URLSearchParams({ page: "1", limit: "60" });

    // Fetch offers from server
    const exclusiveOffer = await apiFetch<{ data: { data: Offer[] } | null }>(
      `/exclusive-offer/my-offers?${offersQuery.toString()}`,
      {
        method: "GET",
        // Next.js cache / revalidation
        next: { tags: ["exclusive-offer"] },
      },
      "server"
    );

    // Fetch categories from server
    const getCategories = await apiFetch<{ data: any }>(
      `/category?${categoriesQuery.toString()}`,
      {
        method: "GET",
        next: { tags: ["categories"] },
      },
      "server"
    );

    // Default to empty arrays if nothing returned
    const offers: Offer[] = exclusiveOffer?.data?.data || [];
    const categories = getCategories?.data || [];

    return <PartnerDashboard offers={offers} getCategories={categories} />;
  } catch (error: any) {
    console.error("Failed to load Partner Dashboard:", error.message);
    return (
      <div className="text-red-500 p-4">
        Failed to load Partner Dashboard data.
      </div>
    );
  }
}