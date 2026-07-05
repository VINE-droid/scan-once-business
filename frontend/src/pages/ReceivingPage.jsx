import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchByBarcode,
  receiveStock,
} from "../services/inventoryService";

function ReceivingPage() {
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!barcode.trim()) {
      alert("Please enter a barcode.");
      return;
    }

    try {
      const response = await searchByBarcode(barcode);
      setProduct(response.data);
    } catch (err) {
      console.error(err);
      alert("Product not found.");
      setProduct(null);
    }
  };

  const handleReceive = async () => {
    if (!product) {
      alert("Please search for a product first.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    try {
      setLoading(true);

      await receiveStock(barcode, Number(quantity));

      setSuccess("✅ Stock received successfully!");

      setTimeout(() => {
        setBarcode("");
        setQuantity("");
        setProduct(null);
        navigate("/inventory");
      }, 1500);

    } catch (err) {
      console.error(err);
      alert("Failed to receive stock.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 rounded-xl bg-white p-8 shadow">

      <h1 className="mb-6 text-3xl font-bold">
        Receive Stock
      </h1>

      {success && (
        <div className="mb-6 rounded-lg border border-green-300 bg-green-100 p-4 text-green-800">
          {success}
        </div>
      )}

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Enter Barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          disabled={loading || product}
          className="w-full rounded-lg border p-3 disabled:bg-gray-100 disabled:text-gray-500"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
        >
          Search Product
        </button>

        {product && (
          <div className="space-y-2 rounded-lg bg-gray-100 p-4">

            <p>
              <strong>Name:</strong> {product.name}
            </p>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>Selling Price:</strong> ₹{product.selling_price}
            </p>

            <p>
              <strong>Current Stock:</strong>{" "}
              {product.inventory.current_quantity}
            </p>

          </div>
        )}

        <input
          type="number"
          placeholder="Quantity Received"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full rounded-lg border p-3"
        />

        <button
          onClick={handleReceive}
          disabled={loading}
          className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Receiving Stock..." : "Receive Stock"}
        </button>

      </div>
    </div>
  );
}

export default ReceivingPage;