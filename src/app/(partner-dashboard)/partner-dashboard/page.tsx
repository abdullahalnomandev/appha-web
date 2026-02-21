import PartnerDashboard from "@/components/partnerDashboard";
import { Offer } from "@/components/partnerDashboard/ManageOffer/ManageOffersTab";
import { apiFetch } from "@/lib/api/api-fech";

export default async function PartnerDashboardHomePage() {
  // Fetch offers from server
  const exclusiveOffer = await apiFetch(
    "/exclusive-offer/my-offers?page=1&limit=10",
    { method: "GET", cache: "force-cache",next:{ tags:["exclusive-offer"] } },
    "server",
  ) as { data: { data: Offer[] } | null }; 


  const getCategories = await apiFetch("/category?page=1&limit=60", { method: "GET", cache: "force-cache" }, "server") as { data: any };

  const offers: Offer[] = exclusiveOffer?.data?.data || []; // default empty array
  const categories = getCategories?.data || [];
  console.log(getCategories);

  return <PartnerDashboard offers={offers} getCategories={categories} />;
}