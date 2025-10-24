import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface RequestWithUser extends Request {
  user?: string | JwtPayload;
}

export function requireAuth(req: RequestWithUser, res: Response, next: NextFunction) {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    req.user = decoded;
    next();
  } catch (error: any) {
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
