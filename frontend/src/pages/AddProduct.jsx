import { useState } from "react";
import { createProduct,generateBarcode } from "../services/productService";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    barcode: "",
    category: "",
    cost_price: "",
    selling_price: "",
    low_stock_threshold: 5,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
const handleGenerateBarcode = async () => {
  try {
    const res = await generateBarcode();

    setForm((prev) => ({
      ...prev,
      barcode: res.barcode,
    }));
  } catch (err) {
    alert("Failed to generate barcode.");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await createProduct(form);

      setMessage(res.message);

      setForm({
        name: "",
        barcode: "",
        category: "",
        cost_price: "",
        selling_price: "",
        low_stock_threshold: 5,
      });

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to create product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Add New Product
        </h1>

        <p className="mt-2 text-slate-500">
          Create a product before receiving stock.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >

        {message && (
          <div className="rounded-lg bg-emerald-100 p-4 text-emerald-700">
            {message}
          </div>
        )}

        {/* Product Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 p-3"
          />
        </div>

        {/* Barcode */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Barcode
          </label>

          <div className="flex gap-3">

            <input
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
              required
              className="flex-1 rounded-xl border border-slate-300 p-3"
            />

            <button
              type="button"
              onClick={handleGenerateBarcode}
              className="rounded-xl bg-slate-900 px-5 text-white hover:bg-slate-800"
            >
              Generate
            </button>

          </div>

        </div>

        {/* Category */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 p-3"
          />

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Cost Price
            </label>

            <input
              type="number"
              name="cost_price"
              value={form.cost_price}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 p-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Selling Price
            </label>

            <input
              type="number"
              name="selling_price"
              value={form.selling_price}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 p-3"
            />

          </div>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">
            Low Stock Threshold
          </label>

          <input
            type="number"
            name="low_stock_threshold"
            value={form.low_stock_threshold}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 p-3"
          />

        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:bg-gray-400"
        >
          {loading ? "Creating Product..." : "Create Product"}
        </button>

      </form>

    </div>
  );
}