export default function PaymentMethodSelector({ value, onChange }) {
  const methods = ["Cash", "Credit"];

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-600">
        Payment Method
      </label>
      <div className="grid grid-cols-2 gap-3">
        {methods.map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => onChange(method)}
            className={`rounded-lg py-3 text-lg font-semibold transition ${
              value === method
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {method}
          </button>
        ))}
      </div>
    </div>
  );
}
