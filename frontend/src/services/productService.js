import api from "./api";

// Get all products
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Get product by barcode
export const getProductByBarcode = async (barcode) => {
  const response = await api.get(`/products/barcode/${barcode}`);
  return response.data;
};

// Create a new product
export const createProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

export const generateBarcode = async () => {
  const response = await api.get("/products/generate-barcode");
  return response.data;
};