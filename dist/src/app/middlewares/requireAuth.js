"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * 🔐 JWT doğrulama middleware'i
 * Bu middleware, sadece giriş yapmış (token almış) adminlerin belirli route’lara erişmesini sağlar.
 */
function requireAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Yetkilendirme hatası: Token bulunamadı." });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Yetkilendirme hatası: Geçersiz token formatı." });
        }
        // Token’ı doğrula
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // kullanıcı bilgilerini request'e ekle
        next(); // her şey yolundaysa devam et
    }
    catch (err) {
        console.error("Token doğrulama hatası:", err);
        return res.status(401).json({ error: "Yetkilendirme hatası: Geçersiz veya süresi dolmuş token." });
    }
}
//# sourceMappingURL=requireAuth.js.map