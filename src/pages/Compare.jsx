import { useState } from "react";
import api from "../services/api";
import UnitSelector from "../components/UnitSelector";

export default function Compare() {
  const [thisValue, setThisValue] = useState("");
  const [thatValue, setThatValue] = useState("");

  const [thisUnit, setThisUnit] = useState({});
  const [thatUnit, setThatUnit] = useState({});

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/api/measurements/compare", {
        thisQuantity: {
          value: Number(thisValue),
          unit: thisUnit.unit,
        },
        thatQuantity: {
          value: Number(thatValue),
          unit: thatUnit.unit,
        },
      });

      setResult(res.data);
    } catch (err) {
      setError("Comparison failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Compare Quantities
          </h2>
          <p className="text-slate-500 mt-1">
            Compare two values across different units.
          </p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* First Quantity */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                First Quantity
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={thisValue}
                onChange={(e) => setThisValue(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Unit
              </label>
              <UnitSelector onChange={setThisUnit} />
            </div>
          </div>

          {/* Second Quantity */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Second Quantity
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={thatValue}
                onChange={(e) => setThatValue(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Unit
              </label>
              <UnitSelector onChange={setThatUnit} />
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleCompare}
          disabled={!thisValue || !thatValue || !thisUnit.unit || !thatUnit.unit || loading}
          className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
            !thisValue || !thatValue || !thisUnit.unit || !thatUnit.unit || loading
              ? "bg-slate-300 cursor-not-allowed shadow-none"
              : "bg-purple-600 hover:bg-purple-700 hover:shadow-purple-200 active:scale-[0.98]"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 
                  0 0 5.373 0 12h4zm2 
                  5.291A7.962 7.962 0 
                  014 12H0c0 3.042 
                  1.135 5.824 3 
                  7.938l3-2.647z"
                ></path>
              </svg>
              Comparing...
            </>
          ) : (
            "Compare Now"
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Result */}
        {result && !error && (
          <div className="mt-8 p-6 bg-purple-50 border border-purple-100 rounded-2xl text-center">
            <p className="text-slate-600 text-xs uppercase tracking-wider mb-1">
              Comparison Result
            </p>
            <p className="text-2xl font-bold text-purple-700">
              {result.resultString}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}