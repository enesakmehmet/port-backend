import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";
import useragent from "useragent";

export const visitorLogger = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agent = useragent.parse(req.headers["user-agent"] || "unknown");

    await prisma.visitorLog.create({
      data: {
        ip: req.ip || "unknown",
        userAgent: `${agent.family} ${agent.major}.${agent.minor} / ${agent.os?.family} ${agent.os?.major}.${agent.os?.minor}`,
        page: req.originalUrl || "unknown",   // 🔥 burası düzeldi
      },
    });
  } catch (err) {
    console.error("Visitor log kaydedilemedi:", err);
  }

  next(); // ✅ middleware olduğu için önemli
};
