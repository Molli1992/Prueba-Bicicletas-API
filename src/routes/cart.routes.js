import { Router } from "express";
import { getCarts, postCart } from "../controllers/cart.controllers.js";

const router = Router();

router.get("/cart/:userEmail", getCarts);
router.post("/cart", postCart);
router.delete("/cart/:cartId", deleteCart);

export default router;
