import { useEffect, useState } from "react";
import api from "../services/api";

export default function History() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = "/api/measurements/history";

      if (filter === "ERROR") url = "/api/measurements/history/errored";
      else if (filter) url = `/api/measurements/history/${filter}`;

      const res = await api.get(url);
      setData(res.data);
    } catch (err) {
      setError("Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  // ✅ Helper for readable sentence
  const formatOperation = (item) => {
    if (item.error) {
      return `${item.thisValue} ${item.thisUnit} → ❌ ${item.errorMessage}`;
    }

    if (item.operation === "CONVERT") {
      return `${item.thisValue} ${item.thisUnit} → ${item.resultValue} ${item.resultUnit}`;
    }

    return `${item.thisValue} ${item.thisUnit} ${
      item.thatValue ? `& ${item.thatValue} ${item.thatUnit}` : ""
    } → ${item.resultValue || item.resultString}`;
  };

  const getBadgeColor = (op) => {
    switch (op) {
      case "ADD":
        return "bg-blue-100 text-blue-600";
      case "SUBTRACT":
        return "bg-yellow-100 text-yellow-600";
      case "DIVIDE":
        return "bg-purple-100 text-purple-600";
      case "COMPARE":
        return "bg-indigo-100 text-indigo-600";
      case "CONVERT":
        return "bg-green-100 text-green-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">History</h2>
            <p className="text-slate-500 text-sm mt-1">
              Track all your past calculations & conversions
            </p>
          </div>

          {/* Filter */}
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl"
          >
            <option value="">All</option>
            <option value="ADD">Add</option>
            <option value="SUBTRACT">Subtract</option>
            <option value="DIVIDE">Divide</option>
            <option value="COMPARE">Compare</option>
            <option value="CONVERT">Convert</option>
            <option value="ERROR">Errors</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 text-slate-500">
            Loading history...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 mb-4">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && data.length === 0 && !error && (
          <div className="text-center py-10 text-slate-400">
            No history found.
          </div>
        )}

        {/* Cards (🔥 Better than table) */}
        {!loading && data.length > 0 && (
          <div className="space-y-4">
            {data.map((item, i) => (
              <div
                key={i}
                className="p-5 border border-slate-200 rounded-xl hover:shadow-sm transition"
              >
                <div className="flex justify-between items-center mb-2">

                  {/* Operation Badge */}
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getBadgeColor(
                      item.operation
                    )}`}
                  >
                    {item.operation}
                  </span>

                  {/* Status */}
                  {item.error ? (
                    <span className="text-xs text-red-500 font-semibold">
                      ❌ Failed
                    </span>
                  ) : (
                    <span className="text-xs text-green-500 font-semibold">
                      ✅ Success
                    </span>
                  )}
                </div>

                {/* Main Info */}
                <p className="text-lg font-semibold text-slate-800">
                  {formatOperation(item)}
                </p>

                {/* Extra Info */}
                <div className="mt-2 text-sm text-slate-500 flex flex-wrap gap-4">
                  <span>Type: {item.thisMeasurementType}</span>

                  {item.resultMeasurementType && (
                    <span>Result Type: {item.resultMeasurementType}</span>
                  )}
                </div>

                {/* Error Details */}
                {item.error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                    {item.errorMessage}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}