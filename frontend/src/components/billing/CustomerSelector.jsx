export default function CustomerSelector({
  customers,
  selectedCustomerId,
  onChange,
  paymentMethod,
  creditAmount,
}) {
  const selectedCustomer = customers.find(
    (c) => c.id === Number(selectedCustomerId)
  );

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-600">
        Customer
      </label>
      <select
        value={selectedCustomerId}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-lg focus:border-blue-400 focus:outline-none"
      >
        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {paymentMethod === "Credit" && selectedCustomer && (
        <div className="mt-3 space-y-2 rounded-lg bg-amber-50 p-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Current Outstanding</span>
            <span className="font-semibold text-gray-800">
              ₹{selectedCustomer.outstanding_balance.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">This Sale (Credit)</span>
            <span className="font-semibold text-gray-800">
              ₹{creditAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between border-t border-amber-200 pt-2">
            <span className="font-medium text-gray-700">
              New Outstanding
            </span>
            <span className="font-bold text-amber-700">
              ₹{(selectedCustomer.outstanding_balance + creditAmount).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
