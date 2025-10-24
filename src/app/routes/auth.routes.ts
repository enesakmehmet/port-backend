import express from "express";
import { login } from "../controllers/auth.controller";

const router = express.Router();

// 🔐 Giriş endpoint'i
router.post("/login", login);

export default router;
