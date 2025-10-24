"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../utils/prisma"));
const router = (0, express_1.Router)();
router.get("/", async (_req, res) => {
    const logs = await prisma_1.default.visitorLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
    });
    res.json(logs);
});
router.get("/stats", async (_req, res) => {
    const byDay = await prisma_1.default.$queryRaw `SELECT DATE("createdAt") AS date, COUNT(*)::int AS count
     FROM "VisitorLog"
     GROUP BY DATE("createdAt")
     ORDER BY date DESC
     LIMIT 7`;
    const byBrowser = await prisma_1.default.$queryRaw `SELECT "userAgent", COUNT(*)::int AS count
     FROM "VisitorLog"
     GROUP BY "userAgent"
     ORDER BY count DESC
     LIMIT 5`;
    res.json({ byDay, byBrowser });
});
exports.default = router;
//# sourceMappingURL=visitor.routes.js.map