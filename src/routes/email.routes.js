import { Router } from "express";
import {
  contactEmail,
  meyBlaksEmail,
} from "../controllers/email.controllers.js";

const router = Router();

router.post("/emails/contactEmail", contactEmail);
router.post("/emails/meyBlaksEmail", meyBlaksEmail);

export default router;
