import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import inventoryRoutes from "./routes/inventoryRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running 🚀"
  });
});
app.use("/api/sales", salesRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});