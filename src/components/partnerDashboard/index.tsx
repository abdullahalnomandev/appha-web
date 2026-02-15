"use client";

import { useState, useRef, useEffect } from "react";
import { LayoutDashboard, Gift, Users, CalendarCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ManageOffersTab from "./ManageOffersTab";
import DashboardTab from "./DashboardTab";
import MemberValidationTab from "./MemberValidationTab";
import DailyAttendanceTab from "./DailyAttendanceTab";

type Tab = "dashboard" | "offers" | "validation" | "attendance";

const tabs = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "offers", label: "Manage Offers", icon: Gift },
  { key: "validation", label: "Member Validation", icon: Users },
  { key: "attendance", label: "Daily Attendance", icon: CalendarCheck },
];

const STORAGE_KEY = "partner-dashboard-tab";

export default function PartnerDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  // Sync state from query or localStorage
  useEffect(() => {
    const queryTab = searchParams.get("tab") as Tab | null;
    const storedTab = (typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEY)
      : null) as Tab | null;

    if (queryTab && tabs.some((t) => t.key === queryTab)) {
      setActiveTab(queryTab);
    } else if (storedTab && tabs.some((t) => t.key === storedTab)) {
      setActiveTab(storedTab);
      // Update URL to match localStorage
      router.replace(`?tab=${storedTab}`, { scroll: false });
    }
  }, [searchParams, router]);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });

  // Update URL and localStorage when tab changes
  useEffect(() => {
    if (activeTab) {
      router.replace(`?tab=${activeTab}`, { scroll: false });
      localStorage.setItem(STORAGE_KEY, activeTab);
    }
  }, [activeTab, router]);

  // Move sliding pill
  useEffect(() => {
    const index = tabs.findIndex((t) => t.key === activeTab);
    const activeBtn = buttonRefs.current[index];

    if (activeBtn) {
      setPillStyle({
        width: activeBtn.offsetWidth,
        left: activeBtn.offsetLeft,
      });
    }
  }, [activeTab]);

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-6">
      {/* Tabs */}
      <div
        ref={containerRef}
        className="relative mb-8 bg-[#1e293b] rounded-lg border border-white/10 p-1 inline-flex"
      >
        <div
          className="absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out"
          style={{
            width: pillStyle.width,
            left: pillStyle.left,
            background:
              "linear-gradient(180deg, #FCEFAE 0%, #DFBB0B 100%)",
          }}
        />

        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            onClick={() => setActiveTab(tab.key as Tab)}
            className={`relative z-10 cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
              activeTab === tab.key
                ? "text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "dashboard" && <DashboardTab />}
      {activeTab === "offers" && <ManageOffersTab />}
      {activeTab === "validation" && <MemberValidationTab />}
      {activeTab === "attendance" && <DailyAttendanceTab />}
    </div>
  );
}
