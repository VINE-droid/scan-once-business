import { useState, useRef } from "react";
import BarcodeScanner from "./BarcodeScanner";
import { Camera, Plus } from "lucide-react";

export default function ScanInput({ onScan, loading }) {
  const [value, setValue] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const inputRef = useRef(null);

  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) return;

    onScan(value.trim());

    setValue("");

    inputRef.current?.focus();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <label className="mb-3 block text-sm font-medium text-slate-600">
          Scan Barcode
        </label>

        <div className="flex flex-col gap-3 md:flex-row">

          <input
            ref={inputRef}
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Scan or type barcode..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-lg focus:border-emerald-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            <Plus size={18} />

            {loading ? "..." : "Add"}
          </button>

          {isMobile && (
            <button
              type="button"
              onClick={() => setShowScanner(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              <Camera size={18} />

              Camera
            </button>
          )}

        </div>
      </form>

      {showScanner && (
        <BarcodeScanner
          onClose={() => setShowScanner(false)}
          onScan={(barcode) => {
            onScan(barcode);

            setShowScanner(false);
          }}
        />
      )}
    </>
  );
}