import { useState } from "react";
import { measurementTypes } from "../constants/units";

const UnitSelector = ({ onChange }) => {
  const [type, setType] = useState("");
  const [unit, setUnit] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setUnit("");
    onChange({ type: e.target.value, unit: "" });
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    onChange({ type, unit: e.target.value });
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      
      {/* Measurement Type */}
      <select
        value={type}
        onChange={handleTypeChange}
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700 font-medium"
      >
        <option value="">Select Type</option>
        {Object.keys(measurementTypes).map((t) => (
          <option key={t} value={t} className="capitalize">{t.toLowerCase()}</option>
        ))}
      </select>

      {/* Unit Dropdown */}
      <select
        value={unit}
        onChange={handleUnitChange}
        className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700 font-medium ${!type ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!type}
      >
        <option value="">Select Unit</option>
        {type &&
          measurementTypes[type].map((u) => (
            <option key={u} value={u} className="capitalize">{u.toLowerCase()}</option>
          ))}
      </select>
    </div>

  );
};

export default UnitSelector;