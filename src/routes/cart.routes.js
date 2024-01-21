import { Router } from "express";
import {
  getCarts,
  postCart,
  deleteCart,
  deleteAllCarts,
} from "../controllers/cart.controllers.js";

const router = Router();

router.get("/cart/:userEmail", getCarts);
router.post("/cart", postCart);
router.delete("/cart/:cartId", deleteCart);
router.delete("/allCarts/:cartId", deleteAllCarts);

export default router;
