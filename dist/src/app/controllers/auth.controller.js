"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email ve şifre gereklidir." });
        }
        const user = await prisma.adminUser.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Geçersiz kullanıcı veya şifre." });
        }
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Geçersiz kullanıcı veya şifre." });
        }
        // 🔐 Token oluşturma
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d", // 🔥 7 gün geçerli (eski 12h idi)
        });
        return res.json({
            success: true,
            message: "Giriş başarılı",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("❌ Login hatası:", error);
        return res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin." });
    }
}
//# sourceMappingURL=auth.controller.js.map