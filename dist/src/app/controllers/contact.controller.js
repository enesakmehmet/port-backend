"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submit = submit;
exports.list = list;
exports.remove = remove;
const client_1 = require("@prisma/client");
const mailer_1 = require("../utils/mailer");
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
/**
 * 📩 MESAJ GÖNDER — Kullanıcı mesajını kaydet, mail at, Telegram bildirimi gönder
 */
async function submit(req, res) {
    try {
        const { name, email, subject, message } = req.body;
        // 🧩 Girdi doğrulama
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return res
                .status(400)
                .json({ error: "Lütfen ad, e-posta ve mesaj alanlarını doldurun." });
        }
        // 🗄️ Veritabanına kaydet
        const savedMessage = await prisma.contactMessage.create({
            data: { name, email, subject, message },
        });
        // ✉️ E-posta bildirimi gönder
        try {
            await mailer_1.mailer.sendMail({
                from: process.env.SMTP_USER,
                to: process.env.CONTACT_TO,
                subject: `📩 Yeni iletişim mesajı: ${subject || "(konu yok)"}`,
                text: `👤 Ad: ${name}\n📧 E-posta: ${email}\n🧾 Konu: ${subject || "-"}\n\n💬 Mesaj:\n${message}`,
            });
        }
        catch (mailErr) {
            console.warn("⚠️ E-posta gönderilemedi:", mailErr);
        }
        // 💬 Telegram bildirimi gönder
        try {
            const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
            if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
                console.warn("⚠️ Telegram bilgiler (.env) eksik — gönderim atlandı.");
            }
            else {
                const telegramText = `
📬 *Yeni İletişim Mesajı*
────────────────────────
👤 *Ad Soyad:* ${name}
📧 *E-posta:* ${email}
🧾 *Konu:* ${subject || "-"}
💬 *Mesaj:*
${message}
`;
                await axios_1.default.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    chat_id: TELEGRAM_CHAT_ID,
                    text: telegramText,
                    parse_mode: "Markdown",
                });
            }
        }
        catch (telegramErr) {
            console.error("⚠️ Telegram gönderim hatası:", telegramErr);
        }
        // ✅ Başarılı yanıt
        res.status(201).json({
            success: true,
            message: "Mesaj başarıyla gönderildi.",
            data: savedMessage,
        });
    }
    catch (err) {
        console.error("❌ Mesaj gönderimi başarısız:", err);
        res.status(500).json({ error: "Sunucu hatası: Mesaj gönderilemedi." });
    }
}
/**
 * 🧾 TÜM MESAJLARI LİSTELE — Admin paneli için
 */
async function list(req, res) {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(messages);
    }
    catch (err) {
        console.error("❌ Mesaj listesi alınamadı:", err);
        res.status(500).json({ error: "Mesajlar alınamadı." });
    }
}
/**
 * 🗑️ MESAJ SİL — Admin paneli için
 */
async function remove(req, res) {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ error: "Mesaj ID'si gerekli." });
        await prisma.contactMessage.delete({ where: { id: Number(id) } });
        res.json({ success: true, message: "Mesaj başarıyla silindi." });
    }
    catch (err) {
        console.error("❌ Mesaj silinemedi:", err);
        res.status(500).json({ error: "Mesaj silinemedi." });
    }
}
//# sourceMappingURL=contact.controller.js.map