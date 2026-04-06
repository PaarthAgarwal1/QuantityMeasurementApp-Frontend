import { useState } from "react";
import api from "../services/api";
import UnitSelector from "../components/UnitSelector";

export default function Convert() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState(null);
  const [toUnit, setToUnit] = useState(null);
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    // ✅ Frontend validation
    if (!value || !fromUnit?.unit || !toUnit?.unit) {
      setError("Please fill all fields correctly.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await api.post("/api/measurements/convert", {
        thisQuantity: {
          value: Number(value),
          unit: fromUnit.unit,
        },
        targetUnit: toUnit.unit,
      });

      // ✅ Handle backend error properly
      if (res.data.error) {
        setError(res.data.errorMessage || "Conversion failed");
      } else {
        setResult(res.data);
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Unit Conversion
          </h2>
          <p className="text-slate-500 mt-1">
            Convert values between different units easily.
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-6 mb-8">

          {/* Value Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Enter Value
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* From Unit */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              From Unit
            </label>
            <UnitSelector onChange={setFromUnit} />
          </div>

          {/* To Unit */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              To Unit
            </label>
            <UnitSelector onChange={setToUnit} />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleConvert}
          disabled={loading}
          className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
            loading
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
          }`}
        >
          {loading ? "Converting..." : "Convert Now"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
            {error} , Measurement Type Mismatch. Please ensure both units belong to the same measurement type.
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-8 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl text-center">
            <p className="text-slate-600 text-xs uppercase tracking-wider mb-1">
              Conversion Result
            </p>
            <p className="text-4xl font-black text-indigo-700">
              {result.resultValue}{" "}
              <span className="text-xl font-bold">
                {result.resultUnit}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}