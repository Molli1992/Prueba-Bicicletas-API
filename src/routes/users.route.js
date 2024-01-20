import { Router } from "express";
import {
  getUserByEmailAndPassword,
  postUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/user/:email/:password", getUserByEmailAndPassword);
router.post("/user", postUser);

export default router;
