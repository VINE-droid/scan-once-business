function InventoryTable({ products, loading }) {
  if (loading) {
    return (
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        Loading products...
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-4">Barcode</th>
            <th className="text-left px-6 py-4">Product</th>
            <th className="text-left px-6 py-4">Category</th>
            <th className="text-left px-6 py-4">Selling Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.product_id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4">{product.barcode}</td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">
                ₹{product.selling_price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;