import { Router } from "express";
import {
  getProducts,
  postProducts,
  getProductById,
} from "../controllers/products.controllers.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", postProducts);

export default router;
