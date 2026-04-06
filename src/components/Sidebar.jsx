import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  FiPlus,
  FiMinus,
  FiDivide,
  FiRepeat,
  FiBarChart2,
  FiClock,
} from "react-icons/fi";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { id: "add", label: "Add", icon: <FiPlus /> },
    { id: "subtract", label: "Subtract", icon: <FiMinus /> },
    { id: "divide", label: "Divide", icon: <FiDivide /> },
    { id: "convert", label: "Convert", icon: <FiRepeat /> },
    { id: "compare", label: "Compare", icon: <FiBarChart2 /> },
    { id: "history", label: "History", icon: <FiClock /> },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col p-6 sticky top-0 overflow-y-auto">
      
      {/* Logo */}
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="text-3xl font-bold text-slate-900 hover:text-indigo-600 transition-colors"
        >
          Quantity Measurement
        </Link>
      </div>

      {/* Nav */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === `/dashboard/${item.id}`;

          return (
            <Link
              key={item.id}
              to={`/dashboard/${item.id}`}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
          {user?.username?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <span className="text-sm font-semibold text-slate-700">
          {user?.username || "User"}
        </span>
      </div>
    </aside>
  );
}