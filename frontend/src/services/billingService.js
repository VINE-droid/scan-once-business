import api from "./api";

// Fetch product by barcode
export const getProductByBarcode = async (barcode) => {
  const response = await api.get(`/products/barcode/${barcode}`);
  return response.data;
};

// Fetch all products
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Fetch customers from backend
export const getCustomers = async () => {
  const response = await api.get("/customers");
  return response.data;
};

// Submit a real sale
export const submitSale = async (payload) => {
  const response = await api.post("/sales", payload);
  return response.data;
};