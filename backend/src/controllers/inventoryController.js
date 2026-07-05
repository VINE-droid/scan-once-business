import supabase from "../config/db.js";

export const receiveStock = async (req, res) => {
  try {
    const { barcode, quantity } = req.body;

    // Find product
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("barcode", barcode)
      .single();

    if (productError || !product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Find inventory
    const { data: inventory, error: inventoryError } = await supabase
      .from("inventory")
      .select("*")
      .eq("product_id", product.product_id)
      .single();

    if (inventoryError || !inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory record not found"
      });
    }

    const newQuantity = inventory.current_quantity + quantity;

    // Update inventory
    const { error: updateError } = await supabase
      .from("inventory")
      .update({
        current_quantity: newQuantity,
        last_updated: new Date().toISOString()
      })
      .eq("product_id", product.product_id);

    if (updateError) {
      return res.status(500).json({
        success: false,
        message: updateError.message
      });
    }
    // Create STOCK_IN event
const { error: eventError } = await supabase
  .from("events")
  .insert({
    event_type: "STOCK_IN",
    product_id: product.product_id,
    quantity_change: quantity,
    financial_amount: product.cost_price * quantity,
    metadata: {
      barcode: barcode,
      product_name: product.name
    }
  });

if (eventError) {
  return res.status(500).json({
    success: false,
    message: eventError.message
  });
}

    res.json({
      success: true,
      message: "Stock received successfully",
      previous_quantity: inventory.current_quantity,
      received_quantity: quantity,
      new_quantity: newQuantity
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
export const getInventory = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        product_id,
        barcode,
        name,
        category,
        selling_price,
        inventory (
          current_quantity,
          low_stock_threshold,
          last_updated
        )
      `);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
export const getLowStock = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("inventory")
      .select(`
        current_quantity,
        low_stock_threshold,
        last_updated,
        products (
          product_id,
          barcode,
          name,
          category,
          selling_price
        )
      `);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    const lowStock = data.filter(
      (item) => item.current_quantity <= item.low_stock_threshold
    );

    res.json({
      success: true,
      data: lowStock,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};