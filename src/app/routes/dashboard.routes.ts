import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 📊 Dashboard istatistikleri
router.get("/stats", async (req, res) => {
  try {
    const projects = await prisma.project.count();
    const certificates = await prisma.certificate.count();
    const visitors = await prisma.visitorLog.count();
    const messages = await prisma.contactMessage.count();
    const skills = await prisma.skill.count();
    const timeline = await prisma.timelineEvent.count();

    res.json({
      projects,
      certificates,
      visitors,
      messages,
      skills,
      timeline,
    });
  } catch (error) {
    console.error("❌ Dashboard verileri alınamadı:", error);
    res.status(500).json({ error: "Dashboard verileri alınamadı" });
  }
});

export default router;
