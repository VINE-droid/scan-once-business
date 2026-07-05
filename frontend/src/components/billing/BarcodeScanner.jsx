import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { CheckCircle2, Camera } from "lucide-react";

export default function BarcodeScanner({
  onScan,
  onClose,
}) {
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 260,
          height: 140,
        },
        aspectRatio: 1.77,
        rememberLastUsedCamera: true,
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        if (scanned) return;

        setScanned(true);
        setBarcode(decodedText);

        // Optional Beep
        try {
          const audio = new Audio("/beep.mp3");
          audio.play();
        } catch {}

        await scanner.clear();

        setTimeout(() => {
          onScan(decodedText);
          onClose();
        }, 800);
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-emerald-100 p-3">
              <Camera
                size={22}
                className="text-emerald-700"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold">
                Scan Barcode
              </h2>

              <p className="text-sm text-slate-500">
                Point your camera at the product barcode
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 hover:bg-slate-100"
          >
            ✕
          </button>

        </div>

        {/* Scanner */}

        <div className="p-5">

          {!scanned ? (
            <>
              <div
                id="reader"
                className="overflow-hidden rounded-2xl border"
              />

              <p className="mt-4 text-center text-sm text-slate-500">
                Hold the barcode inside the frame.
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center py-10">

              <CheckCircle2
                size={70}
                className="text-emerald-500"
              />

              <h3 className="mt-4 text-2xl font-bold text-emerald-700">
                Product Detected
              </h3>

              <p className="mt-2 font-mono text-lg">
                {barcode}
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Adding to cart...
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}