import { Router } from "express";
import {
  getOrders,
  postOrders,
  updateOrderStatus,
} from "../controllers/orders.controllers.js";

const router = Router();

router.get("/orders", getOrders);
router.post("/orders", postOrders);
router.put("/orders/:userEmail", updateOrderStatus);

export default router;
