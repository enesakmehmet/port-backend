import { Router } from "express";
import prisma from "../utils/prisma";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// 📁 Upload klasörü kontrolü
const uploadDir = path.join("public/uploads/cv");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📂 Multer ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Tek dosya saklamak istiyoruz → sabit isim
    cb(null, "cv" + path.extname(file.originalname)); // örn: cv.pdf
  },
});
const upload = multer({ storage });

/* ---------------------------
   📌 1. CV Yükleme (POST)
---------------------------- */
router.post("/upload-cv", upload.single("cv"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Dosya yok" });

    const cvPath = `/uploads/cv/${req.file.filename}`;

    const about = await prisma.about.upsert({
      where: { id: 1 },
      update: { cvUrl: cvPath },
      create: {
        name: "Enes Akmehmet",
        bio: "Benim hakkımda kısmı...",
        avatarUrl: "/uploads/avatar.png",
        github: "https://github.com/Enes-akmehmet",
        linkedin: "https://linkedin.com/in/enesakmehmet",
        instagram: "https://instagram.com/enesakmehmet",
        cvUrl: cvPath,
      },
    });

    res.json({ message: "✅ CV yüklendi!", cvUrl: about.cvUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "CV yüklenirken hata oluştu." });
  }
});

/* ---------------------------
   📌 2. About Getir (GET)
---------------------------- */
router.get("/", async (req, res) => {
  try {
    const about = await prisma.about.findUnique({ where: { id: 1 } });
    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Veri alınamadı." });
  }
});

/* ---------------------------
   📌 3. About Güncelle (PUT)
---------------------------- */
router.put("/", async (req, res) => {
  try {
    const { name, bio, github, linkedin, instagram } = req.body;
    const about = await prisma.about.update({
      where: { id: 1 },
      data: { name, bio, github, linkedin, instagram },
    });
    res.json({ message: "✅ Hakkında bilgisi güncellendi!", about });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Güncelleme başarısız." });
  }
});

/* ---------------------------
   📸 4. Profil Resmi Yükle (POST)
---------------------------- */
const avatarDir = path.join("public/uploads/avatar");
if (!fs.existsSync(avatarDir)) {
  fs.mkdirSync(avatarDir, { recursive: true });
}

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarDir);
  },
  filename: (req, file, cb) => {
    cb(null, "avatar" + path.extname(file.originalname)); // örn: avatar.png
  },
});
const avatarUpload = multer({ storage: avatarStorage });

router.post(
  "/upload-avatar",
  avatarUpload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ error: "Resim dosyası yok" });

      const avatarPath = `/uploads/avatar/${req.file.filename}`;

      const about = await prisma.about.upsert({
        where: { id: 1 },
        update: { avatarUrl: avatarPath },
        create: {
          name: "Enes Akmehmet",
          bio: "Benim hakkımda kısmı...",
          avatarUrl: avatarPath,
          github: "https://github.com/Enes-akmehmet",
          linkedin: "https://linkedin.com/in/enesakmehmet",
          instagram: "https://instagram.com/enesakmehmet",
          cvUrl: "",
        },
      });

      res.json({
        message: "✅ Profil resmi yüklendi!",
        avatarUrl: about.avatarUrl,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Profil resmi yüklenirken hata oluştu." });
    }
  }
);

export default router;
