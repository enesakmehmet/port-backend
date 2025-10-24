// src/app/controllers/visitor.controller.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 🧾 Yeni ziyaret kaydı oluşturur
 */
export async function logVisitor(req: Request, res: Response) {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown";
    const userAgent = req.headers["user-agent"] || "unknown";
    const page = req.body.page || req.originalUrl || "unknown";

    const visitor = await prisma.visitorLog.create({
      data: { ip, userAgent, page },
    });

    res.status(201).json(visitor);
  } catch (error) {
    console.error("❌ Ziyaretçi kaydı hatası:", error);
    res.status(500).json({ message: "Ziyaret kaydedilemedi" });
  }
}

/**
 * 📊 Son 7 gün ziyaret istatistiklerini döndürür (grafik için)
 */
export async function getLast7DaysStats(req: Request, res: Response) {
  try {
    const stats = await prisma.$queryRaw<
      { date: string; count: number }[]
    >`
      SELECT
        TO_CHAR("createdAt", 'YYYY-MM-DD') AS date,
        COUNT(*)::int AS count
      FROM "VisitorLog"
      WHERE "createdAt" >= NOW() - INTERVAL '7 days'
      GROUP BY date
      ORDER BY date ASC
    `;

    res.json(stats);
  } catch (error) {
    console.error("❌ Ziyaretçi istatistik hatası:", error);
    res.status(500).json({ message: "İstatistik verileri alınamadı" });
  }
}

/**
 * 🧠 Tarayıcı dağılımı (pie chart için)
 */
export async function getBrowserStats(req: Request, res: Response) {
  try {
    const stats = await prisma.$queryRaw<
      { browser: string; count: number }[]
    >`
      SELECT
        CASE
          WHEN "userAgent" ILIKE '%Chrome%' THEN 'Chrome'
          WHEN "userAgent" ILIKE '%Firefox%' THEN 'Firefox'
          WHEN "userAgent" ILIKE '%Edge%' THEN 'Edge'
          WHEN "userAgent" ILIKE '%Opera%' THEN 'Opera'
          WHEN "userAgent" ILIKE '%Safari%' THEN 'Safari'
          ELSE 'Diğer'
        END AS browser,
        COUNT(*)::int AS count
      FROM "VisitorLog"
      WHERE "createdAt" >= NOW() - INTERVAL '7 days'
      GROUP BY browser
    `;

    res.json(stats);
  } catch (error) {
    console.error("❌ Tarayıcı istatistik hatası:", error);
    res.status(500).json({ message: "Tarayıcı verileri alınamadı" });
  }
}
