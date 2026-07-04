import { useEffect, useState } from "react";
import InventoryTable from "../components/inventory/InventoryTable";
import { getAllProducts } from "../services/inventoryService";
function InventoryPage() {
    const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
  const summaryCards = [
    {
  title: "Total Products",
  value: loading ? "..." : products.length,
},
    {
      title: "Low Stock",
      value: 0,
    },
    {
      title: "Out of Stock",
      value: 0,
    },
  ];
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

 return (
  <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-8">
      Inventory Dashboard
    </h1>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryCards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
        >
          <p className="text-sm text-gray-500">
            {card.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {card.value}
          </h2>
        </div>
      ))}
    </div>

    {/* Inventory Table */}
    <InventoryTable
  products={products}
  loading={loading}
/>
  </div>
);
}
export default InventoryPage;