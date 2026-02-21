"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutDashboard, Gift, Users, CalendarCheck } from "lucide-react";

const DashboardTab = React.lazy(() => import("./DashboardTab"));
const ManageOffersTab = React.lazy(() => import("./ManageOffer/ManageOffersTab"));
const MemberValidationTab = React.lazy(() => import("./MemberValidationTab"));
const DailyAttendanceTab = React.lazy(() => import("./DailyAttendanceTab"));

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

  // Sync tab from URL or localStorage
  useEffect(() => {
    const queryTab = searchParams?.get("tab") as Tab | null;
    const storedTab =
      typeof window !== "undefined"
        ? (localStorage.getItem(STORAGE_KEY) as Tab | null)
        : null;

    if (queryTab && tabs.some((t) => t.key === queryTab)) {
      setActiveTab(queryTab);
    } else if (storedTab && tabs.some((t) => t.key === storedTab)) {
      setActiveTab(storedTab);
      router.replace(`?tab=${storedTab}`, { scroll: false });
    }
  }, [searchParams, router]);

  // Update URL & localStorage when tab changes
  useEffect(() => {
    if (activeTab) {
      router.replace(`?tab=${activeTab}`, { scroll: false });
      localStorage.setItem(STORAGE_KEY, activeTab);
    }
  }, [activeTab, router]);

  // Sliding pill
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const index = tabs.findIndex((t) => t.key === activeTab);
    const activeBtn = buttonRefs.current[index];
    if (activeBtn) {
      setPillStyle({ width: activeBtn.offsetWidth, left: activeBtn.offsetLeft });
    }
  }, [activeTab]);

  // Render only the active tab component
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "offers":
        return <ManageOffersTab />;
      case "validation":
        return <MemberValidationTab />;
      case "attendance":
        return <DailyAttendanceTab />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-285 mx-auto px-4 py-6">
      {/* Tabs */}
      <div
        ref={containerRef}
        className="relative mb-8 bg-white rounded-lg border border-gray-200 p-1 inline-flex shadow-sm"
      >
        <div
          className="absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out"
          style={{
            width: pillStyle.width,
            left: pillStyle.left,
            background: "linear-gradient(180deg, #FCEFAE 0%, #DFBB0B 100%)",
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
              activeTab === tab.key ? "text-black" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content wrapped in Suspense for lazy loading */}
      <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
        {renderTabContent()}
      </Suspense>
    </div>
  );
}