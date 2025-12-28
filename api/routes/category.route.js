import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

// Controller imports
import {
  addCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const categoryRouter = Router();

/* ================= CATEGORY ROUTES ================= */
categoryRouter.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  upload.array("images"),
  addCategory
);

categoryRouter.get("/", getCategories);
categoryRouter.get("/:categoryId", getCategory);

categoryRouter.put(
  "/:categoryId",
  authMiddleware,
  adminMiddleware,
  upload.array("images"),
  updateCategory
);

categoryRouter.delete(
  "/:categoryId",
  authMiddleware,
  adminMiddleware,
  deleteCategory
);

export default categoryRouter;
