import { serverFetch } from "@/lib/server-fetch";

export default async function AboutContent() {

  const about = await serverFetch("/settings/about", { cache: "force-cache" });

  return (
    <div className="max-w-[1300px] mx-auto px-4 space-y-10 py-14 text-[#545454]">
      <div dangerouslySetInnerHTML={{ __html: (about as any)?.data?.description }} />
    </div>
  );
}
