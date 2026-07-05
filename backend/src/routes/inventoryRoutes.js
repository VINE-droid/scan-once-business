import express from "express";
import {
  receiveStock,
  getInventory,
  getLowStock,
} from "../controllers/inventoryController.js";

const router = express.Router();

// GET inventory
router.get("/", getInventory);


// GET Low stock

router.get("/low-stock", getLowStock);

// Receive stock
router.post("/receive", receiveStock);


export default router;  