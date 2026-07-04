import express from "express";
import { receiveStock } from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/receive", receiveStock);

export default router;