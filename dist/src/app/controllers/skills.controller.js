"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.list = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
/* ---------------------------
   ✅ Tüm skill’leri listele
---------------------------- */
const list = async (req, res) => {
    try {
        const skills = await prisma_1.default.skill.findMany({
            orderBy: { id: "asc" },
        });
        res.json(skills);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Yetenekler alınamadı." });
    }
};
exports.list = list;
/* ---------------------------
   ✅ Yeni skill ekle
---------------------------- */
const create = async (req, res) => {
    try {
        const { name, category, level } = req.body;
        const skill = await prisma_1.default.skill.create({
            data: { name, category, level },
        });
        res.json(skill);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Skill eklenemedi." });
    }
};
exports.create = create;
/* ---------------------------
   ✅ Skill güncelle
---------------------------- */
const update = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, category, level } = req.body;
        const skill = await prisma_1.default.skill.update({
            where: { id },
            data: { name, category, level },
        });
        res.json(skill);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Skill güncellenemedi." });
    }
};
exports.update = update;
/* ---------------------------
   ✅ Skill sil
---------------------------- */
const remove = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma_1.default.skill.delete({ where: { id } });
        res.json({ message: "Skill silindi." });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Skill silinemedi." });
    }
};
exports.remove = remove;
//# sourceMappingURL=skills.controller.js.map