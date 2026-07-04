import supabase from "../config/db.js";

// GET all products
export const getAllProducts = async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }

  res.json({
    success: true,
    data
  });
};

// GET product by barcode
export const getProductByBarcode = async (req, res) => {

  const { barcode } = req.params;

  // Get product
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("barcode", barcode)
    .single();

  if (productError) {
    return res.status(404).json({
      success: false,
      error: "Product not found"
    });
  }

  // Get inventory
  const { data: inventory } = await supabase
    .from("inventory")
    .select("current_quantity, low_stock_threshold")
    .eq("product_id", product.product_id)
    .single();

  res.json({
    success: true,
    data: {
      ...product,
      inventory
    }
  });

};