"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Store,
    Gift,
    Calendar,
    Bell,
    Star,
    MessageSquare,
    Phone,
    Tag,
    Snowflake,
    LogOut,
    User,
    Megaphone,
    Menu,
} from "lucide-react";

const tabs = [
    { key: "", label: "Dashboard", icon: LayoutDashboard },
    { key: "partner-directory", label: "Partner Directory", icon: Store },
    { key: "offers", label: "Offers", icon: Gift },
    // { key: "special", label: "Special Offers", icon: Tag },
    // { key: "seasonal", label: "Seasonal", icon: Snowflake },
    { key: "event", label: "Events", icon: Calendar },
    { key: "sponsors", label: "Sponsors", icon: Megaphone },
    { key: "favorites", label: "Favorites", icon: Star },
    { key: "feedback", label: "Feedback", icon: MessageSquare },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "contact", label: "Contacts", icon: Phone },
];

export default function MemberLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-navy flex flex-col overflow-x-hidden">      {/* Header */}
            <header className="border-b border-white/10 shrink-0">
                <div className="flex items-center justify-between px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-white/60 hover:text-white"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="w-9 h-9 rounded-full border-2 border-amber flex items-center justify-center">
                            <User className="w-5 h-5 text-amber" />
                        </div>

                        <div>
                            <p className="text-base font-bold text-white">Member Portal</p>
                            <p className="text-xs text-white/50">Welcome back, John</p>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-amber border border-amber/40 rounded-md px-4 py-2 hover:bg-amber/10"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </Link>
                </div>
            </header>

            {/* Gold line */}
            <div
                className="h-0.5"
                style={{
                    background:
                        "linear-gradient(90deg, #FCEFAE 0%, #DFBB0B 50%, #FCEFAE 100%)",
                }}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`border-r border-white/10 transition-all duration-300 overflow-y-auto ${sidebarOpen ? "w-56" : "w-14"
                    // className={`border-r border-white/10 bg-navy-light transition-all duration-300 overflow-y-auto ${sidebarOpen ? "w-56" : "w-14"
                        }`}
                >
                    <nav className="flex flex-col gap-1 p-2 mt-2">
                        {tabs.map((tab) => {
                            const href = `/member/${tab.key}`;
                            const isActive =
                                pathname === href ||
                                (tab.key === "" && pathname === "/member");

                            return (
                                <Link
                                    key={tab.label}
                                    href={href}
                                    title={tab.label}
                                    className={`flex items-center gap-3 rounded-md text-sm font-medium transition-colors ${sidebarOpen
                                        ? "px-3 py-2.5"
                                        : "px-0 py-2.5 justify-center"
                                        } ${isActive
                                            ? "text-[black]"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                        }`}
                                    style={
                                        isActive
                                            ? {
                                                background:
                                                    "linear-gradient(180deg, #FCEFAE 0%, #DFBB0B 100%)",
                                            }
                                            : undefined
                                    }
                                >
                                    <tab.icon className="w-4 h-4 shrink-0" />
                                    {sidebarOpen && <span>{tab.label ?? " "}</span>}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Page Content */}
                <main className="relative flex-1 overflow-y-auto overflow-x-hidden p-6">
                    {/* Background image layer */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: "url('/assets/bg/image-bg.png')",
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            opacity: 0.03,
                        }}
                    />

                    {/* Page content */}
                    <div className="relative z-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}