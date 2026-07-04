import express from "express";
import supabase from "../config/db.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
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
});
// GET product by barcode
router.get("/barcode/:barcode", async (req, res) => {

    const { barcode } = req.params;

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
                low_stock_threshold
            )
        `)
        .eq("barcode", barcode)
        .single();

    if (error) {
        return res.status(404).json({
            success: false,
            error: "Product not found"
        });
    }

    res.json({
        success: true,
        data
    });

});

export default router;