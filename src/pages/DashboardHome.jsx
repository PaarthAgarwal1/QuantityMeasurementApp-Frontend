import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardHome() {
  const { user } = useAuth();
  const operations = [
    {
      id: "add",
      title: "Add",
      description: "Add two quantities together",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      id: "subtract",
      title: "Subtract",
      description: "Subtract one quantity from another",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      ),
    },
    {
      id: "divide",
      title: "Divide",
      description: "Divide one quantity by another",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12m-1 0a1 1 0 102 0 1 1 0 10-2 0M4 12h16M12 6m-1 0a1 1 0 102 0 1 1 0 10-2 0M12 18m-1 0a1 1 0 102 0 1 1 0 10-2 0" />
        </svg>
      ),
    },
    {
      id: "convert",
      title: "Convert",
      description: "Convert between different units",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: "compare",
      title: "Compare",
      description: "Compare two quantities",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: "history",
      title: "History",
      description: "View your measurement history",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, {user?.username || 'Guest'}!</h1>
        <p className="text-slate-500 text-lg">Start measuring and converting quantities with ease</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operations.map((op) => (
          <div key={op.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white flex flex-col items-start gap-4 group">
            <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
              {op.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{op.title}</h3>
              <p className="text-slate-500 text-sm mb-6">{op.description}</p>
            </div>
            <Link
              to={`/dashboard/${op.id}`}
              className="w-full text-center border border-slate-200 py-2.5 rounded-lg text-slate-900 font-semibold hover:bg-slate-50 transition-colors mt-auto"
            >
              Open
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

