"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.list = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
// 🧱 Tüm timeline olaylarını listele
const list = async (req, res) => {
    try {
        const events = await prisma_1.default.timelineEvent.findMany({
            orderBy: { id: "desc" },
        });
        res.json(events);
    }
    catch (error) {
        console.error("❌ Timeline alınamadı:", error);
        res.status(500).json({ error: "Timeline alınamadı" });
    }
};
exports.list = list;
// 🆕 Yeni olay ekle
const create = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        if (!title || !date)
            return res.status(400).json({ error: "Başlık ve tarih zorunludur." });
        const newEvent = await prisma_1.default.timelineEvent.create({
            data: { title, description, date },
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error("❌ Timeline eklenemedi:", error);
        res.status(500).json({ error: "Timeline eklenemedi" });
    }
};
exports.create = create;
// ✏️ Olay güncelle
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date } = req.body;
        const updated = await prisma_1.default.timelineEvent.update({
            where: { id: Number(id) },
            data: { title, description, date },
        });
        res.json(updated);
    }
    catch (error) {
        console.error("❌ Timeline güncellenemedi:", error);
        res.status(500).json({ error: "Timeline güncellenemedi" });
    }
};
exports.update = update;
// 🗑️ Olay sil
const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.timelineEvent.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Timeline olayı silindi." });
    }
    catch (error) {
        console.error("❌ Timeline silinemedi:", error);
        res.status(500).json({ error: "Timeline silinemedi" });
    }
};
exports.remove = remove;
//# sourceMappingURL=timeline.controller.js.map