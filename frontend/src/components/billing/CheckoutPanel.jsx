import PaymentMethodSelector from "./PaymentMethodSelector";
import CustomerSelector from "./CustomerSelector";

export default function CheckoutPanel({
  grandTotal,
  customers,
  selectedCustomerId,
  onCustomerChange,
  paymentMethod,
  onPaymentMethodChange,
  onCheckout,
  disabled,
  loading,
}) {
  return (
    <div className="space-y-5 rounded-xl bg-white p-5 shadow">
      <h2 className="text-lg font-bold text-gray-800">Checkout</h2>

      <CustomerSelector
        customers={customers}
        selectedCustomerId={selectedCustomerId}
        onChange={onCustomerChange}
        paymentMethod={paymentMethod}
        creditAmount={grandTotal}
      />

      <PaymentMethodSelector
        value={paymentMethod}
        onChange={onPaymentMethodChange}
      />

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-lg font-semibold text-gray-700">Total</span>
        <span className="text-2xl font-bold text-gray-900">
          ₹{grandTotal.toFixed(2)}
        </span>
      </div>

      <button
        onClick={onCheckout}
        disabled={disabled || loading}
        className="w-full rounded-lg bg-green-600 py-4 text-lg font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
}
