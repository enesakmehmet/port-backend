import { Request, Response } from "express";
import prisma from "../utils/prisma";
import path from "path";
import fs from "fs";

// 📄 Sertifikaları listele
export const list = async (req: Request, res: Response) => {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { id: "desc" },
    });
    res.json(certificates);
  } catch (error) {
    console.error("❌ Sertifikalar alınamadı:", error);
    res.status(500).json({ message: "Sertifikalar alınamadı." });
  }
};

// ➕ Yeni sertifika ekle
export const create = async (req: Request, res: Response) => {
  try {
    const { title, platform, link, description } = req.body;
    if (!title || !platform || !req.file)
      return res.status(400).json({ message: "Zorunlu alanlar eksik." });

    const imageUrl = `/uploads/certificates/${req.file.filename}`;

    const cert = await prisma.certificate.create({
      data: { title, platform, link, description, imageUrl },
    });

    res.status(201).json(cert);
  } catch (error) {
    console.error("❌ Sertifika eklenemedi:", error);
    res.status(500).json({ message: "Sertifika eklenemedi." });
  }
};

// 🗑️ Sertifika sil
export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const cert = await prisma.certificate.findUnique({ where: { id } });
    if (!cert) return res.status(404).json({ message: "Sertifika bulunamadı." });

    if (cert.imageUrl) {
      const filePath = path.join(
        __dirname,
        "../../public",
        cert.imageUrl.replace("/uploads", "uploads")
      );
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await prisma.certificate.delete({ where: { id } });
    res.json({ message: "Sertifika silindi." });
  } catch (error) {
    console.error("❌ Sertifika silinemedi:", error);
    res.status(500).json({ message: "Sertifika silinemedi." });
  }
};
