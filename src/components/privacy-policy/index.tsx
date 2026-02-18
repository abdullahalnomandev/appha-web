import React from 'react'
import BannerHeader from '../ui/BannerHeader'
import { apiFetch } from '@/lib/api/api-fech';

async function PrivacyPolicy() {
    const about = await apiFetch("/settings/privacy-policy", { cache: "force-cache" });
  
  return (
    <>
     <BannerHeader 
      title="Privacy Policy"
      description="Your privacy is important to us."
     />
     <div className="max-w-325 mx-auto px-4 space-y-10 py-14 text-[#545454]">
      <div dangerouslySetInnerHTML={{ __html: (about as any)?.data?.description }} />
     </div>
    </>
  )
}

export default PrivacyPolicy