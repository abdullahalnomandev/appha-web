"use client";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export default function Layout({children}: { children: React.ReactNode;}) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
     {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-[1140px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border-2 border-yellow-500 flex items-center justify-center">
              <User className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-base font-bold">Partner Portal</p>
              <p className="text-xs text-white/50">Welcome back, Partner</p>
            </div>
          </div>

          <Link
            href="/partner-login"
            className="flex items-center gap-2 text-sm text-yellow-500 border border-yellow-500/40 rounded-md px-4 py-2 hover:bg-yellow-500/10 transition"
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