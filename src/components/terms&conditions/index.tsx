import React from 'react'
import BannerHeader from '../ui/BannerHeader'
import { serverFetch } from '@/lib/server-fetch';

async function TremsAndConditions() {
    const trams = await serverFetch("/settings/terms-of-services", { cache: "force-cache" });
  
  return (
    <>
     <BannerHeader 
      title="Terms & Conditions"
      description="Your privacy is important to us."
     />
     <div className="max-w-[1300px] mx-auto px-4 space-y-10 py-14 text-[#545454]">
      <div dangerouslySetInnerHTML={{ __html: (trams as any)?.data?.description }} />
     </div>
    </>
  )
}

export default TremsAndConditions