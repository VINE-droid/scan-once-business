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
            <th className="text-left px-6 py-4">Stock</th>
            <th className="text-left px-6 py-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const quantity = product.inventory?.current_quantity ?? 0;
            const threshold = product.inventory?.low_stock_threshold ?? 0;

            let status = (
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                In Stock
              </span>
            );

            if (quantity === 0) {
              status = (
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                  Out of Stock
                </span>
              );
            } else if (quantity <= threshold) {
              status = (
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                  Low Stock
                </span>
              );
            }

            return (
              <tr
                key={product.product_id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">{product.barcode}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">₹{product.selling_price}</td>
                <td className="px-6 py-4 font-semibold">{quantity}</td>
                <td className="px-6 py-4">{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;