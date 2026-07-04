import express from "express";

import {
  getAllProducts,
  getProductByBarcode
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/barcode/:barcode", getProductByBarcode);

export default router;