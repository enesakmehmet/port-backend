"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Yetkisiz erişim: Token eksik veya hatalı format" });
    }
    const token = authHeader.split(" ")[1];
    try {
        // ✅ TS hatasını tamamen bastırıyoruz, runtime davranışı değişmiyor
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("❌ JWT doğrulama hatası:", error.message);
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ message: "Token süresi dolmuş, lütfen tekrar giriş yap." });
        }
        return res
            .status(401)
            .json({ message: "Geçersiz token, erişim reddedildi." });
    }
}
//# sourceMappingURL=auth.js.map