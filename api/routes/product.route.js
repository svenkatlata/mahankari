import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import upload from "../middlewares/multer.js";

import {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const productRouter = Router();

/* ================= PRODUCT ROUTES ================= */

// Create product
productRouter.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  upload.array("images"),
  addProduct
);

// Get all products
productRouter.get("/", getAllProducts);

// Get product by ID
productRouter.get("/:productId", getProduct);

// Update product
productRouter.put(
  "/:productId",
  authMiddleware,
  adminMiddleware,
  upload.array("images"),
  updateProduct
);

// Delete product
productRouter.delete(
  "/:productId",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

export default productRouter;
