function CartRow({ item, onQtyChange, onRemove }) {
  const subtotal = item.unit_price * item.quantity;

  return (
    <tr className="border-b border-gray-100">
      <td className="py-3 px-4 font-medium text-gray-800">{item.name}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQtyChange(item.product_id, item.quantity - 1)}
            className="h-8 w-8 rounded-lg bg-gray-100 text-lg font-bold text-gray-700 hover:bg-gray-200"
          >
            −
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => onQtyChange(item.product_id, item.quantity + 1)}
            className="h-8 w-8 rounded-lg bg-gray-100 text-lg font-bold text-gray-700 hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </td>
      <td className="py-3 px-4 text-gray-600">₹{item.unit_price.toFixed(2)}</td>
      <td className="py-3 px-4 font-semibold text-gray-800">
        ₹{subtotal.toFixed(2)}
      </td>
      <td className="py-3 px-4">
        <button
          onClick={() => onRemove(item.product_id)}
          className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default function Cart({ cartItems, onQtyChange, onRemove }) {
  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

  return (
    <div className="rounded-xl bg-white shadow">
      <div className="border-b border-gray-100 p-4">
        <h2 className="text-lg font-bold text-gray-800">Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="p-8 text-center text-gray-400">
          Scan a product to add it to the cart.
        </div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-500">
              <th className="px-4 py-2 font-medium">Product</th>
              <th className="px-4 py-2 font-medium">Qty</th>
              <th className="px-4 py-2 font-medium">Unit Price</th>
              <th className="px-4 py-2 font-medium">Subtotal</th>
              <th className="px-4 py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CartRow
                key={item.product_id}
                item={item}
                onQtyChange={onQtyChange}
                onRemove={onRemove}
              />
            ))}
          </tbody>
        </table>
      )}

      <div className="flex items-center justify-between border-t border-gray-100 p-4">
        <span className="text-lg font-semibold text-gray-700">
          Grand Total
        </span>
        <span className="text-2xl font-bold text-gray-900">
          ₹{grandTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
