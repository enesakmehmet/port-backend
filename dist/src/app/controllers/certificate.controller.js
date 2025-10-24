"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.create = exports.list = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// 📄 Sertifikaları listele
const list = async (req, res) => {
    try {
        const certificates = await prisma_1.default.certificate.findMany({
            orderBy: { id: "desc" },
        });
        res.json(certificates);
    }
    catch (error) {
        console.error("❌ Sertifikalar alınamadı:", error);
        res.status(500).json({ message: "Sertifikalar alınamadı." });
    }
};
exports.list = list;
// ➕ Yeni sertifika ekle
const create = async (req, res) => {
    try {
        const { title, platform, link, description } = req.body;
        if (!title || !platform || !req.file)
            return res.status(400).json({ message: "Zorunlu alanlar eksik." });
        const imageUrl = `/uploads/certificates/${req.file.filename}`;
        const cert = await prisma_1.default.certificate.create({
            data: { title, platform, link, description, imageUrl },
        });
        res.status(201).json(cert);
    }
    catch (error) {
        console.error("❌ Sertifika eklenemedi:", error);
        res.status(500).json({ message: "Sertifika eklenemedi." });
    }
};
exports.create = create;
// 🗑️ Sertifika sil
const remove = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const cert = await prisma_1.default.certificate.findUnique({ where: { id } });
        if (!cert)
            return res.status(404).json({ message: "Sertifika bulunamadı." });
        if (cert.imageUrl) {
            const filePath = path_1.default.join(__dirname, "../../public", cert.imageUrl.replace("/uploads", "uploads"));
            if (fs_1.default.existsSync(filePath))
                fs_1.default.unlinkSync(filePath);
        }
        await prisma_1.default.certificate.delete({ where: { id } });
        res.json({ message: "Sertifika silindi." });
    }
    catch (error) {
        console.error("❌ Sertifika silinemedi:", error);
        res.status(500).json({ message: "Sertifika silinemedi." });
    }
};
exports.remove = remove;
//# sourceMappingURL=certificate.controller.js.map