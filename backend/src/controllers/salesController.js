import supabase from "../config/db.js";

export const createSale = async (req, res) => {
  try {
    const {
      items,
      customer_id,
      payment_method,
      grand_total,
    } = req.body;

    // Basic validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Create sale
    const { data: sale, error: saleError } = await supabase
      .from("sales")
      .insert({
        customer_id,
        total_amount: grand_total,
        payment_mode: payment_method.toUpperCase(),
      })
      .select()
      .single();

    if (saleError) {
      return res.status(500).json({
        success: false,
        error: saleError.message,
      });
    }

    // Prepare sale items
 const saleItems = items.map((item) => ({
  sale_id: sale.sale_id,
  product_id: item.product_id,
  quantity: item.quantity,
  unit_price: item.unit_price,
}));

    // Insert sale items
    const { error: itemError } = await supabase
      .from("sale_items")
      .insert(saleItems);

    if (itemError) {
      return res.status(500).json({
        success: false,
        error: itemError.message,
      });
    }
    // Update inventory
for (const item of items) {

    // Create SALE event
const { error: eventError } = await supabase
  .from("events")
  .insert({
    event_type: "SALE",
    product_id: item.product_id,
    sale_id: sale.sale_id,
    customer_id,
    quantity_change: -item.quantity,
    financial_amount: item.unit_price * item.quantity,
    metadata: {
      payment_method,
      product_name: item.name,
    },
  });

if (eventError) {
  return res.status(500).json({
    success: false,
    error: eventError.message,
  });
}
  // Get current inventory
  const { data: inventory, error: inventoryError } = await supabase
    .from("inventory")
    .select("*")
    .eq("product_id", item.product_id)
    .single();

  if (inventoryError || !inventory) {
    return res.status(404).json({
      success: false,
      message: `Inventory not found for product ${item.product_id}`,
    });
  }

  // Check stock availability
  if (inventory.current_quantity < item.quantity) {
    return res.status(400).json({
      success: false,
      message: `Insufficient stock for product ${item.product_id}`,
    });
  }

  // Update inventory
  const { error: updateError } = await supabase
    .from("inventory")
    .update({
      current_quantity: inventory.current_quantity - item.quantity,
      last_updated: new Date().toISOString(),
    })
    .eq("product_id", item.product_id);

  if (updateError) {
    return res.status(500).json({
      success: false,
      error: updateError.message,
    });
  }
}
// Handle Credit Sales
if (payment_method.toUpperCase() === "CREDIT") {

  // Create ledger entry
  const { error: ledgerError } = await supabase
    .from("customer_ledger")
    .insert({
      customer_id,
      sale_id: sale.sale_id,
      transaction_type: "CHARGE",
      amount: grand_total,
    });

  if (ledgerError) {
    return res.status(500).json({
      success: false,
      error: ledgerError.message,
    });
  }

  // Get current customer balance
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("credit_balance")
    .eq("customer_id", customer_id)
    .single();

  if (customerError) {
    return res.status(500).json({
      success: false,
      error: customerError.message,
    });
  }

  // Update customer balance
  const { error: balanceError } = await supabase
    .from("customers")
    .update({
      credit_balance: customer.credit_balance + grand_total,
    })
    .eq("customer_id", customer_id);

  if (balanceError) {
    return res.status(500).json({
      success: false,
      error: balanceError.message,
    });
  }
}
    res.json({
      success: true,
      message: "Sale created successfully",
      data: sale,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};