import { useState, useRef } from "react";

export default function ScanInput({ onScan, loading }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onScan(value.trim());
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-4 shadow">
      <label className="mb-2 block text-sm font-medium text-gray-600">
        Scan Barcode
      </label>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Scan or type barcode..."
          className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-lg focus:border-blue-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "..." : "Add"}
        </button>
      </div>
    </form>
  );
}
