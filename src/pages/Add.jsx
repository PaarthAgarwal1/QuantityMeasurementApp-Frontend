import MeasurementForm from "../components/MeasurementForm";

export default function Add() {
  return (
    <div className="p-4">
      <MeasurementForm operation="add" />
    </div>
  );
}