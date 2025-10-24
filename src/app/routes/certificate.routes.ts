import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import * as ctrl from "../controllers/certificate.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

// 📁 Upload klasörü yolu (public/uploads/certificates)
const uploadDir = path.join(__dirname, "../../../public/uploads/certificates");

// Eğer klasör yoksa oluştur
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📸 Multer storage yapılandırması
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const safeName = file.originalname.replace(/\s+/g, "_"); // boşlukları kaldır
    cb(null, `${uniqueSuffix}-${safeName}`);
  },
});

const upload = multer({ storage });

// ✅ 1. Tüm sertifikaları getir
router.get("/", ctrl.list);

// ✅ 2. Yeni sertifika ekle (admin yetkisi gerektirir)
router.post("/", requireAuth, upload.single("image"), ctrl.create);

// ✅ 3. Sertifika sil (admin yetkisi gerektirir)
router.delete("/:id", requireAuth, ctrl.remove);

export default router;
