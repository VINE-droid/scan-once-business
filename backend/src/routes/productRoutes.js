import express from "express";

import {
  getAllProducts,
  getProductByBarcode,
  createProduct,
   generateBarcode,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/generate-barcode", generateBarcode);
router.get("/barcode/:barcode", getProductByBarcode);
router.post("/", createProduct);

export default router;