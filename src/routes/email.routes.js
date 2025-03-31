import { Router } from "express";
import {
  contactEmail,
} from "../controllers/email.controllers.js";

const router = Router();

router.post("/emails/contactEmail", contactEmail);

export default router;