import { Router } from "express";
import { getCarts, postCart } from "../controllers/cart.controllers.js";

const router = Router();

router.get("/cart/:userID", getCarts);
router.post("/cart", postCart);

export default router;
