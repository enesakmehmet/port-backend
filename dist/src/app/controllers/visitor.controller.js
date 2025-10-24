"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logVisitor = logVisitor;
exports.getLast7DaysStats = getLast7DaysStats;
exports.getBrowserStats = getBrowserStats;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * 🧾 Yeni ziyaret kaydı oluşturur
 */
async function logVisitor(req, res) {
    try {
        const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
            req.socket.remoteAddress ||
            "unknown";
        const userAgent = req.headers["user-agent"] || "unknown";
        const page = req.body.page || req.originalUrl || "unknown";
        const visitor = await prisma.visitorLog.create({
            data: { ip, userAgent, page },
        });
        res.status(201).json(visitor);
    }
    catch (error) {
        console.error("❌ Ziyaretçi kaydı hatası:", error);
        res.status(500).json({ message: "Ziyaret kaydedilemedi" });
    }
}
/**
 * 📊 Son 7 gün ziyaret istatistiklerini döndürür (grafik için)
 */
async function getLast7DaysStats(req, res) {
    try {
        const stats = await prisma.$queryRaw `
      SELECT
        TO_CHAR("createdAt", 'YYYY-MM-DD') AS date,
        COUNT(*)::int AS count
      FROM "VisitorLog"
      WHERE "createdAt" >= NOW() - INTERVAL '7 days'
      GROUP BY date
      ORDER BY date ASC
    `;
        res.json(stats);
    }
    catch (error) {
        console.error("❌ Ziyaretçi istatistik hatası:", error);
        res.status(500).json({ message: "İstatistik verileri alınamadı" });
    }
}
/**
 * 🧠 Tarayıcı dağılımı (pie chart için)
 */
async function getBrowserStats(req, res) {
    try {
        const stats = await prisma.$queryRaw `
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
    }
    catch (error) {
        console.error("❌ Tarayıcı istatistik hatası:", error);
        res.status(500).json({ message: "Tarayıcı verileri alınamadı" });
    }
}
//# sourceMappingURL=visitor.controller.js.map