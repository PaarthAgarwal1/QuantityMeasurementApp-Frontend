import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-8 sticky top-0 z-10 ">

      {/* Right Section */}
      <div className="relative">
        
        {/* Profile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {/* Username */}
          <span className="text-sm font-medium text-slate-700">
            {user?.username || "User"}
          </span>

          {/* Dropdown Icon */}
          <svg
            className={`w-4 h-4 text-slate-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
            
            {/* User Info */}
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-semibold text-slate-800">
                {user?.username || "User"}
              </p>
              <p className="text-xs text-slate-500">
                Logged in
              </p>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col">

              <button
                onClick={logout}
                className="text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}