import express from "express";
import { submit, list, remove } from "../controllers/contact.controller";

const router = express.Router();

// 📩 İletişim formundan mesaj gönderme
router.post("/", submit);

// 🧾 Admin panel için tüm mesajları listeleme
router.get("/", list);

// 🗑️ Admin panelden mesaj silme
router.delete("/:id", remove);

export default router;
