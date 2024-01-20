import { Router } from "express";
import {
  getUserById,
  postUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/user/:id", getUserById);
router.post("/user", postUser);

export default router;