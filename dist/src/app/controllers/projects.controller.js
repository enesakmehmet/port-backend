"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * 🔹 Tüm projeleri listele
 */
async function list(req, res) {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(projects);
    }
    catch (err) {
        console.error("❌ Projeler alınamadı:", err);
        res.status(500).json({ error: "Projeler alınamadı" });
    }
}
/**
 * 🔹 Tek proje getir
 */
async function getById(req, res) {
    try {
        const { id } = req.params;
        const project = await prisma.project.findUnique({
            where: { id: Number(id) },
        });
        if (!project) {
            return res.status(404).json({ error: "Proje bulunamadı" });
        }
        res.json(project);
    }
    catch (err) {
        console.error("❌ Proje getirilemedi:", err);
        res.status(500).json({ error: "Proje getirilemedi" });
    }
}
/**
 * 🔹 Yeni proje oluştur
 */
async function create(req, res) {
    try {
        const { title, description, mainLang, topics, techs, imageUrl, liveUrl, repoUrl } = req.body;
        if (!title || !description || !mainLang || !imageUrl) {
            return res.status(400).json({ error: "Zorunlu alanlar eksik" });
        }
        const project = await prisma.project.create({
            data: {
                title,
                description,
                mainLang,
                topics,
                techs,
                imageUrl,
                liveUrl,
                repoUrl,
            },
        });
        res.status(201).json(project);
    }
    catch (err) {
        console.error("❌ Proje eklenemedi:", err);
        res.status(500).json({ error: "Proje eklenemedi" });
    }
}
/**
 * 🔹 Mevcut projeyi güncelle
 */
async function update(req, res) {
    try {
        const { id } = req.params;
        const { title, description, mainLang, topics, techs, imageUrl, liveUrl, repoUrl } = req.body;
        const existing = await prisma.project.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            return res.status(404).json({ error: "Proje bulunamadı" });
        }
        const updated = await prisma.project.update({
            where: { id: Number(id) },
            data: { title, description, mainLang, topics, techs, imageUrl, liveUrl, repoUrl },
        });
        res.json(updated);
    }
    catch (err) {
        console.error("❌ Proje güncellenemedi:", err);
        res.status(500).json({ error: "Proje güncellenemedi" });
    }
}
/**
 * 🔹 Projeyi sil
 */
async function remove(req, res) {
    try {
        const { id } = req.params;
        const existing = await prisma.project.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            return res.status(404).json({ error: "Proje bulunamadı" });
        }
        await prisma.project.delete({ where: { id: Number(id) } });
        res.json({ success: true });
    }
    catch (err) {
        console.error("❌ Proje silinemedi:", err);
        res.status(500).json({ error: "Proje silinemedi" });
    }
}
//# sourceMappingURL=projects.controller.js.map