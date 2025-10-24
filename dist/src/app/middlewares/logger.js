"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitorLogger = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const useragent_1 = __importDefault(require("useragent"));
const visitorLogger = async (req, res, next) => {
    try {
        const agent = useragent_1.default.parse(req.headers["user-agent"] || "unknown");
        await prisma_1.default.visitorLog.create({
            data: {
                ip: req.ip || "unknown",
                userAgent: `${agent.family} ${agent.major}.${agent.minor} / ${agent.os?.family} ${agent.os?.major}.${agent.os?.minor}`,
                page: req.originalUrl || "unknown", // 🔥 burası düzeldi
            },
        });
    }
    catch (err) {
        console.error("Visitor log kaydedilemedi:", err);
    }
    next(); // ✅ middleware olduğu için önemli
};
exports.visitorLogger = visitorLogger;
//# sourceMappingURL=logger.js.map