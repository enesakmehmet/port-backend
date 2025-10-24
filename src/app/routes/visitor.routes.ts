import { Router } from "express";
import prisma from "../utils/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  const logs = await prisma.visitorLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  res.json(logs);
});

router.get("/stats", async (_req, res) => {
  const byDay = await prisma.$queryRaw<
    { date: Date; count: number }[]
  >`SELECT DATE("createdAt") AS date, COUNT(*)::int AS count
     FROM "VisitorLog"
     GROUP BY DATE("createdAt")
     ORDER BY date DESC
     LIMIT 7`;

  const byBrowser = await prisma.$queryRaw<
    { userAgent: string; count: number }[]
  >`SELECT "userAgent", COUNT(*)::int AS count
     FROM "VisitorLog"
     GROUP BY "userAgent"
     ORDER BY count DESC
     LIMIT 5`;

  res.json({ byDay, byBrowser });
});

export default router;
