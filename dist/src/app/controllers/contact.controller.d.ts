import { Request, Response } from "express";
/**
 * 📩 MESAJ GÖNDER — Kullanıcı mesajını kaydet, mail at, Telegram bildirimi gönder
 */
export declare function submit(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
/**
 * 🧾 TÜM MESAJLARI LİSTELE — Admin paneli için
 */
export declare function list(req: Request, res: Response): Promise<void>;
/**
 * 🗑️ MESAJ SİL — Admin paneli için
 */
export declare function remove(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=contact.controller.d.ts.map