import { Router } from "express";
import {
  getProducts,
  postProducts,
} from "../controllers/products.controllers.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products", postProducts);

export default router;
