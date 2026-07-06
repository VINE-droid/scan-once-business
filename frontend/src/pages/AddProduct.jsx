import { useState } from "react";
import { createProduct,generateBarcode } from "../services/productService";
import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";import { useNavigate } from "react-router-dom";



export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    barcode: "",
    category: "",
    cost_price: "",
    selling_price: "",
    low_stock_threshold: 5,
  });
  const navigate = useNavigate();
  const categories = [
  "Beverages",
  "Snacks",
  "Dairy",
  "Bakery",
  "Frozen Foods",
  "Fruits & Vegetables",
  "Grocery",
  "Personal Care",
  "Household",
  "Stationery",
  "Electronics",
  "Other",
];
const barcodeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);
 const [errors, setErrors] = useState({});

 const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
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
const validateForm = () => {
  const newErrors = {};

  if (!form.name.trim()) {
    newErrors.name = "Product name is required.";
  }

  if (!form.barcode.trim()) {
    newErrors.barcode = "Barcode is required.";
  }

  if (!form.category.trim()) {
    newErrors.category = "Category is required.";
  }

  if (!form.cost_price || Number(form.cost_price) <= 0) {
    newErrors.cost_price = "Enter a valid cost price.";
  }

  if (!form.selling_price || Number(form.selling_price) <= 0) {
    newErrors.selling_price = "Enter a valid selling price.";
  }

  if (
    Number(form.selling_price) <
    Number(form.cost_price)
  ) {
    newErrors.selling_price =
      "Selling price cannot be less than cost price.";
  }

  if (
    Number(form.low_stock_threshold) < 0
  ) {
    newErrors.low_stock_threshold =
      "Threshold cannot be negative.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const productData = {
  ...form,
  category:
    form.category === "Other"
      ? form.customCategory
      : form.category,
};

const res = await createProduct(productData);

      setCreatedProduct({
  name: form.name,
  barcode: form.barcode,
  category: form.category,
});

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
useEffect(() => {
  if (
    createdProduct &&
    barcodeRef.current
  ) {
    JsBarcode(barcodeRef.current, createdProduct.barcode, {
  format: "CODE128",
  displayValue: true,
  lineColor: "#111827",
  background: "#ffffff",
  width: 2.5,
  height: 90,
  fontSize: 18,
  margin: 12,
});
  }
}, [createdProduct]);
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

        {createdProduct && (
  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">

    <div className="flex items-center gap-3">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white">
        ✓
      </div>

      <div>

        <h3 className="text-xl font-bold text-emerald-800">
          Product Created Successfully!
        </h3>

        <p className="text-sm text-emerald-700">
          Your new product has been added to the inventory system.
        </p>

      </div>

    </div>

    <div className="mt-6 grid gap-4 rounded-xl bg-white p-5 md:grid-cols-3">

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Product
        </p>

        <p className="mt-1 font-semibold text-slate-800">
          {createdProduct.name}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Barcode
        </p>

        <p className="mt-1 font-mono font-semibold text-slate-800">
          {createdProduct.barcode}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Category
        </p>

        <p className="mt-1 font-semibold text-slate-800">
          {createdProduct.category}
        </p>
      </div>

    </div>
  

<div className="mt-6 flex justify-center rounded-xl bg-white p-6">
    <svg ref={barcodeRef}></svg>
</div>

    <div className="mt-6 flex flex-col gap-3 md:flex-row">

      <button
        type="button"
        onClick={() => navigate("/receive")}
        className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
      >
        Receive Stock
      </button>

      <button
        type="button"
        onClick={() => setCreatedProduct(null)}
        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        Add Another Product
      </button>
      <button
  type="button"
  onClick={() => {
    const svg = barcodeRef.current;

    const serializer = new XMLSerializer();

    const source =
      serializer.serializeToString(svg);

    const blob = new Blob([source], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `ScanOnce-${createdProduct.name}-${createdProduct.barcode}.svg`;

    link.click();

    URL.revokeObjectURL(url);
  }}
  className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
>
  Download Barcode
</button>

    </div>

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
  className={`w-full rounded-xl border p-3 transition ${
    errors.name
      ? "border-red-500 focus:border-red-500"
      : "border-slate-300 focus:border-emerald-500"
  }`}
/>

{errors.name && (
  <p className="mt-1 text-sm text-red-600">
    {errors.name}
  </p>
)}
          
          
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
  className={`flex-1 rounded-xl border p-3 transition ${
    errors.barcode
      ? "border-red-500 focus:border-red-500"
      : "border-slate-300 focus:border-emerald-500"
  }`}
/>

            <button
              type="button"
              onClick={handleGenerateBarcode}
              className="rounded-xl bg-slate-900 px-5 text-white hover:bg-slate-800"
            >
              Generate
            </button>

          </div>
          {errors.barcode && (
  <p className="mt-1 text-sm text-red-600">
    {errors.barcode}
  </p>
)}

        </div>

        {/* Category */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

         <select
  name="category"
  value={form.category}
  onChange={handleChange}
  className={`w-full rounded-xl border bg-white p-3 transition ${
    errors.category
      ? "border-red-500"
      : "border-slate-300"
  }`}
>
  <option value="">
    Select Category
  </option>

  {categories.map((category) => (
    <option
      key={category}
      value={category}
    >
      {category}
    </option>
  ))}
</select>
{form.category === "Other" && (
  <div className="mt-4">
    <label className="mb-2 block text-sm font-medium">
      Custom Category
    </label>

    <input
      type="text"
      name="customCategory"
      value={form.customCategory || ""}
      onChange={(e) =>
        setForm({
          ...form,
          customCategory: e.target.value,
        })
      }
      placeholder="Enter category"
      className="w-full rounded-xl border border-slate-300 p-3"
    />
  </div>
)}

{errors.category && (
  <p className="mt-1 text-sm text-red-600">
    {errors.category}
  </p>
)}
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
  className={`w-full rounded-xl border p-3 transition ${
    errors.cost_price
      ? "border-red-500 focus:border-red-500"
      : "border-slate-300 focus:border-emerald-500"
  }`}
/>

{errors.cost_price && (
  <p className="mt-1 text-sm text-red-600">
    {errors.cost_price}
  </p>
)}

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
  className={`w-full rounded-xl border p-3 transition ${
    errors.selling_price
      ? "border-red-500 focus:border-red-500"
      : "border-slate-300 focus:border-emerald-500"
  }`}
/>

{errors.selling_price && (
  <p className="mt-1 text-sm text-red-600">
    {errors.selling_price}
  </p>
)}
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
  className={`w-full rounded-xl border p-3 transition ${
    errors.low_stock_threshold
      ? "border-red-500 focus:border-red-500"
      : "border-slate-300 focus:border-emerald-500"
  }`}
/>

{errors.low_stock_threshold && (
  <p className="mt-1 text-sm text-red-600">
    {errors.low_stock_threshold}
  </p>
)}

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