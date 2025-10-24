"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../utils/prisma"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// 📁 Upload klasörü kontrolü
const uploadDir = path_1.default.join("public/uploads/cv");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
// 📂 Multer ayarları
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Tek dosya saklamak istiyoruz → sabit isim
        cb(null, "cv" + path_1.default.extname(file.originalname)); // örn: cv.pdf
    },
});
const upload = (0, multer_1.default)({ storage });
/* ---------------------------
   📌 1. CV Yükleme (POST)
---------------------------- */
router.post("/upload-cv", upload.single("cv"), async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: "Dosya yok" });
        const cvPath = `/uploads/cv/${req.file.filename}`;
        const about = await prisma_1.default.about.upsert({
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "CV yüklenirken hata oluştu." });
    }
});
/* ---------------------------
   📌 2. About Getir (GET)
---------------------------- */
router.get("/", async (req, res) => {
    try {
        const about = await prisma_1.default.about.findUnique({ where: { id: 1 } });
        res.json(about);
    }
    catch (err) {
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
        const about = await prisma_1.default.about.update({
            where: { id: 1 },
            data: { name, bio, github, linkedin, instagram },
        });
        res.json({ message: "✅ Hakkında bilgisi güncellendi!", about });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Güncelleme başarısız." });
    }
});
/* ---------------------------
   📸 4. Profil Resmi Yükle (POST)
---------------------------- */
const avatarDir = path_1.default.join("public/uploads/avatar");
if (!fs_1.default.existsSync(avatarDir)) {
    fs_1.default.mkdirSync(avatarDir, { recursive: true });
}
const avatarStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avatarDir);
    },
    filename: (req, file, cb) => {
        cb(null, "avatar" + path_1.default.extname(file.originalname)); // örn: avatar.png
    },
});
const avatarUpload = (0, multer_1.default)({ storage: avatarStorage });
router.post("/upload-avatar", avatarUpload.single("avatar"), async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: "Resim dosyası yok" });
        const avatarPath = `/uploads/avatar/${req.file.filename}`;
        const about = await prisma_1.default.about.upsert({
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Profil resmi yüklenirken hata oluştu." });
    }
});
exports.default = router;
//# sourceMappingURL=about.routes.js.map