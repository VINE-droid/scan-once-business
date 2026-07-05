import { useState } from "react";

function InventoryTable({ products, loading }) {
  const [search, setSearch] = useState("");

  if (loading) {
    return (
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-lg shadow-slate-200/40">
        <p className="text-lg font-medium text-slate-600">
          Loading inventory...
        </p>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const barcode = product.barcode?.toLowerCase() || "";
    const name = product.name?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";

    return (
      barcode.includes(search.toLowerCase()) ||
      name.includes(search.toLowerCase()) ||
      category.includes(search.toLowerCase())
    );
  });

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40">

      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-white p-5 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Inventory
          </h2>

          <p className="text-sm text-slate-500">
            Manage and monitor all products in your inventory.
          </p>
        </div>

        <input
          type="text"
          placeholder="🔍 Search by barcode, product or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:outline-none md:w-80"
        />

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="min-w-full border-separate border-spacing-0">

          <thead className="sticky top-0 z-10 bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Barcode
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Product
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Category
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Price
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Stock
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {

                const quantity =
                  product.inventory?.current_quantity ?? 0;

                const threshold =
                  product.inventory?.low_stock_threshold ?? 5;

                let status = (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    In Stock
                  </span>
                );

                if (quantity === 0) {
                  status = (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      Out of Stock
                    </span>
                  );
                } else if (quantity <= threshold) {
                  status = (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                      Low Stock
                    </span>
                  );
                }

                return (
                  <tr
                    key={product.product_id}
                    className="border-b border-slate-100 odd:bg-white even:bg-slate-50 transition hover:bg-emerald-50"
                  >

                    {/* Barcode */}

                    <td className="px-6 py-4 font-mono text-sm text-slate-600">
                      {product.barcode}
                    </td>

                    {/* Product */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-lg">
                          📦
                        </div>

                        <div>

                          <p className="font-semibold text-slate-900">
                            {product.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {product.barcode}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Category */}

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {product.category}
                    </td>

                    {/* Price */}

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      ₹{Number(product.selling_price).toFixed(2)}
                    </td>

                    {/* Stock */}

                    <td className="px-6 py-4">

                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        {quantity}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">
                      {status}
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>

                <td
                  colSpan="6"
                  className="py-20 text-center"
                >

                  <div className="space-y-3">

                    <div className="text-5xl">
                      📦
                    </div>

                    <h3 className="text-lg font-semibold text-slate-800">
                      No Products Found
                    </h3>

                    <p className="text-sm text-slate-500">
                      Try another search term or receive new stock.
                    </p>

                  </div>

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default InventoryTable;