"use client";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import alphaLogo from "@/assets/alpha-logo.png"; // Update this path to your actual logo
import alpha from "@/assets/image 2.png";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-[1140px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/partner-dashboard">
              <div className="w-10 h-10 rounded-md bg-amber flex items-center justify-center overflow-hidden">
                <Image
                  src={alpha}
                  alt="ALPHA Logo"
                  className="w-full h-full object-contain bg-[#0c1223]"
                />
              </div>
            </Link>
            <div>
              <p className="text-base font-bold">Partner Portal</p>
              <p className="text-xs text-gray-500">Welcome back, Partner</p>
            </div>
          </div>

          <Link
            href="/partner-login"
            className="flex items-center gap-2 text-sm text-yellow-600 border border-yellow-500/40 rounded-md px-4 py-2 hover:bg-yellow-50 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Link>
        </div>
      </header>

      {/* Gold line */}
      <div
        className="h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, #FCEFAE 0%, #DFBB0B 50%, #FCEFAE 100%)",
        }}
      />
      {children}
    </div>
  );
}
