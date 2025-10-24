import { Request, Response } from "express";
/**
 * 🧾 Yeni ziyaret kaydı oluşturur
 */
export declare function logVisitor(req: Request, res: Response): Promise<void>;
/**
 * 📊 Son 7 gün ziyaret istatistiklerini döndürür (grafik için)
 */
export declare function getLast7DaysStats(req: Request, res: Response): Promise<void>;
/**
 * 🧠 Tarayıcı dağılımı (pie chart için)
 */
export declare function getBrowserStats(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=visitor.controller.d.ts.map