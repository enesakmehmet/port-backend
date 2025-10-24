// src/app/controllers/timeline.controller.ts
import { Request, Response } from "express";
import prisma from "../utils/prisma";

// 🧱 Tüm timeline olaylarını listele
export const list = async (req: Request, res: Response) => {
  try {
    const events = await prisma.timelineEvent.findMany({
      orderBy: { id: "desc" },
    });
    res.json(events);
  } catch (error) {
    console.error("❌ Timeline alınamadı:", error);
    res.status(500).json({ error: "Timeline alınamadı" });
  }
};

// 🆕 Yeni olay ekle
export const create = async (req: Request, res: Response) => {
  try {
    const { title, description, date } = req.body;
    if (!title || !date)
      return res.status(400).json({ error: "Başlık ve tarih zorunludur." });

    const newEvent = await prisma.timelineEvent.create({
      data: { title, description, date },
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("❌ Timeline eklenemedi:", error);
    res.status(500).json({ error: "Timeline eklenemedi" });
  }
};

// ✏️ Olay güncelle
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

    const updated = await prisma.timelineEvent.update({
      where: { id: Number(id) },
      data: { title, description, date },
    });

    res.json(updated);
  } catch (error) {
    console.error("❌ Timeline güncellenemedi:", error);
    res.status(500).json({ error: "Timeline güncellenemedi" });
  }
};

// 🗑️ Olay sil
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.timelineEvent.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Timeline olayı silindi." });
  } catch (error) {
    console.error("❌ Timeline silinemedi:", error);
    res.status(500).json({ error: "Timeline silinemedi" });
  }
};
