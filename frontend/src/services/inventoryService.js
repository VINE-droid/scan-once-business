import api from "./api";

// Inventory with stock information
export const getInventory = async () => {
  const response = await api.get("/inventory");
  return response.data;
};

// Low stock products
export const getLowStock = async () => {
  const response = await api.get("/inventory/low-stock");
  return response.data;
};

// Receive new stock
export const receiveStock = async (barcode, quantity) => {
  const response = await api.post("/inventory/receive", {
    barcode,
    quantity,
  });

  return response.data;
};

// Search product by barcode
export const searchByBarcode = async (barcode) => {
  const response = await api.get(`/products/barcode/${barcode}`);
  return response.data;
};

// (Optional) Keep this for compatibility if any component still uses it
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};