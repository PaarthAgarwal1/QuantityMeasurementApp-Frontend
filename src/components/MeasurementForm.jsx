import { useState } from "react";
import api from "../services/api";
import UnitSelector from "./UnitSelector";

const MeasurementForm = ({ operation }) => {
  const [thisValue, setThisValue] = useState("");
  const [thatValue, setThatValue] = useState("");

  const [thisUnit, setThisUnit] = useState({});
  const [thatUnit, setThatUnit] = useState({});

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post(`/api/measurements/${operation}`, {
        thisQuantity: {
          value: Number(thisValue),
          unit: thisUnit?.unit,
        },
        thatQuantity: {
          value: Number(thatValue),
          unit: thatUnit?.unit,
        },
      });

      setResult(res.data);
      console.log("API Response:", res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ clean error condition
  const hasError = error || result?.error;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 capitalize">
            {operation}
          </h2>
          <p className="text-slate-500 mt-1">
            Perform {operation} operations on your quantities.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          {/* First */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                First Quantity
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={thisValue}
                onChange={(e) => {
                  setThisValue(e.target.value);
                  setResult(null); // reset result
                }}
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

          {/* Second */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Second Quantity
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={thatValue}
                onChange={(e) => {
                  setThatValue(e.target.value);
                  setResult(null); // reset result
                }}
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
          onClick={handleSubmit}
          disabled={
            !thisValue ||
            !thatValue ||
            !thisUnit?.unit ||
            !thatUnit?.unit ||
            loading
          }
          className={`w-full text-white font-bold py-4 rounded-xl transition-all ${
            !thisValue ||
            !thatValue ||
            !thisUnit?.unit ||
            !thatUnit?.unit ||
            loading
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Calculating..." : "Calculate Result"}
        </button>

        {/* Error */}
        {hasError && (
          <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
            <span className="font-medium">
              {error || result?.errorMessage}
            </span>
          </div>
        )}

        {/* Result */}
        {result && !hasError && (
          <div className="mt-8 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl text-center">
            <p className="text-slate-600 text-xs uppercase mb-1">
              Final Result
            </p>

            <p className="text-4xl font-black text-indigo-700">
              {result?.resultString
                ? result.resultString
                : result?.resultValue}
              <span className="text-xl font-bold">
                {result?.resultUnit}
              </span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default MeasurementForm;