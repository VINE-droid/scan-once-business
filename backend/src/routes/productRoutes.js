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

export default router;