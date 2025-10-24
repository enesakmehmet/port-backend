import { Request, Response } from "express";
import prisma from "../utils/prisma";

/* ---------------------------
   ✅ Tüm skill’leri listele
---------------------------- */
export const list = async (req: Request, res: Response) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { id: "asc" },
    });
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Yetenekler alınamadı." });
  }
};

/* ---------------------------
   ✅ Yeni skill ekle
---------------------------- */
export const create = async (req: Request, res: Response) => {
  try {
    const { name, category, level } = req.body;
    const skill = await prisma.skill.create({
      data: { name, category, level },
    });
    res.json(skill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Skill eklenemedi." });
  }
};

/* ---------------------------
   ✅ Skill güncelle
---------------------------- */
export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, category, level } = req.body;

    const skill = await prisma.skill.update({
      where: { id },
      data: { name, category, level },
    });

    res.json(skill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Skill güncellenemedi." });
  }
};

/* ---------------------------
   ✅ Skill sil
---------------------------- */
export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.skill.delete({ where: { id } });
    res.json({ message: "Skill silindi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Skill silinemedi." });
  }
};
