import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { mailer } from "../utils/mailer";
import axios from "axios";

const prisma = new PrismaClient();

/**
 * 📩 MESAJ GÖNDER — Kullanıcı mesajını kaydet, mail at, Telegram bildirimi gönder
 */
export async function submit(req: Request, res: Response) {
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
      await mailer.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_TO,
        subject: `📩 Yeni iletişim mesajı: ${subject || "(konu yok)"}`,
        text: `👤 Ad: ${name}\n📧 E-posta: ${email}\n🧾 Konu: ${
          subject || "-"
        }\n\n💬 Mesaj:\n${message}`,
      });
    } catch (mailErr) {
      console.warn("⚠️ E-posta gönderilemedi:", mailErr);
    }

    // 💬 Telegram bildirimi gönder
    try {
      const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

      if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.warn("⚠️ Telegram bilgiler (.env) eksik — gönderim atlandı.");
      } else {
        const telegramText = `
📬 *Yeni İletişim Mesajı*
────────────────────────
👤 *Ad Soyad:* ${name}
📧 *E-posta:* ${email}
🧾 *Konu:* ${subject || "-"}
💬 *Mesaj:*
${message}
`;

        await axios.post(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramText,
            parse_mode: "Markdown",
          }
        );
      }
    } catch (telegramErr) {
      console.error("⚠️ Telegram gönderim hatası:", telegramErr);
    }

    // ✅ Başarılı yanıt
    res.status(201).json({
      success: true,
      message: "Mesaj başarıyla gönderildi.",
      data: savedMessage,
    });
  } catch (err) {
    console.error("❌ Mesaj gönderimi başarısız:", err);
    res.status(500).json({ error: "Sunucu hatası: Mesaj gönderilemedi." });
  }
}

/**
 * 🧾 TÜM MESAJLARI LİSTELE — Admin paneli için
 */
export async function list(req: Request, res: Response) {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (err) {
    console.error("❌ Mesaj listesi alınamadı:", err);
    res.status(500).json({ error: "Mesajlar alınamadı." });
  }
}

/**
 * 🗑️ MESAJ SİL — Admin paneli için
 */
export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Mesaj ID'si gerekli." });

    await prisma.contactMessage.delete({ where: { id: Number(id) } });
    res.json({ success: true, message: "Mesaj başarıyla silindi." });
  } catch (err) {
    console.error("❌ Mesaj silinemedi:", err);
    res.status(500).json({ error: "Mesaj silinemedi." });
  }
}
