import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * 🔐 JWT doğrulama middleware'i
 * Bu middleware, sadece giriş yapmış (token almış) adminlerin belirli route’lara erişmesini sağlar.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded; // kullanıcı bilgilerini request'e ekle

    next(); // her şey yolundaysa devam et
  } catch (err) {
    console.error("Token doğrulama hatası:", err);
    return res.status(401).json({ error: "Yetkilendirme hatası: Geçersiz veya süresi dolmuş token." });
  }
}
