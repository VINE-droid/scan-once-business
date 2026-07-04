import api from "./api";

// Fetch a product by barcode (uses existing backend route)
export const getProductByBarcode = async (barcode) => {
  const response = await api.get(`/products/barcode/${barcode}`);
  return response.data; // { success, data: { ...product, inventory } }
};

// Fetch all products (used for manual product search fallback)
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// NOTE: There is no backend sales/checkout endpoint yet (salesController.js
// and salesRoutes.js are empty). This function mocks the checkout call so the
// frontend flow is complete. Once your teammate builds POST /api/sales,
// replace the mock below with a real api.post("/sales", payload) call.
export const submitSale = async (payload) => {
  console.log("Mock sale submitted:", payload);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          invoice_number: `INV-${Date.now()}`,
          ...payload,
        },
      });
    }, 500);
  });
};

// Mock customers until a customers API exists
export const getMockCustomers = () => [
  { id: 1, name: "Walk-in Customer", outstanding_balance: 0 },
  { id: 2, name: "Ramesh Traders", outstanding_balance: 1200 },
  { id: 3, name: "Suresh Stores", outstanding_balance: 450 },
];
