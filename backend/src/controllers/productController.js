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
// POST create product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      barcode,
      category,
      cost_price,
      selling_price,
      low_stock_threshold,
    } = req.body;

    // Validation
    if (
      !name ||
      !barcode ||
      !category ||
      selling_price == null ||
      cost_price == null
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Check barcode uniqueness
    const { data: existing } = await supabase
      .from("products")
      .select("product_id")
      .eq("barcode", barcode)
      .maybeSingle();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Barcode already exists.",
      });
    }

    // Create product
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        name,
        barcode,
        category,
        cost_price,
        selling_price,
      })
      .select()
      .single();

    if (productError) {
      return res.status(500).json({
        success: false,
        error: productError.message,
      });
    }

    // Create inventory row
    const { error: inventoryError } = await supabase
      .from("inventory")
      .insert({
        product_id: product.product_id,
        current_quantity: 0,
        low_stock_threshold: low_stock_threshold || 5,
      });

    if (inventoryError) {
      return res.status(500).json({
        success: false,
        error: inventoryError.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// GET next available barcode
export const generateBarcode = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("barcode")
      .order("barcode", { ascending: false })
      .limit(1);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    let nextBarcode = "8901001";

    if (data.length > 0) {
      const highest = parseInt(data[0].barcode);

      if (!isNaN(highest)) {
        nextBarcode = String(highest + 1);
      }
    }

    res.json({
      success: true,
      barcode: nextBarcode,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};