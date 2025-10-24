import { Request, Response } from "express";
/**
 * 🔹 Tüm projeleri listele
 */
export declare function list(req: Request, res: Response): Promise<void>;
/**
 * 🔹 Tek proje getir
 */
export declare function getById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
/**
 * 🔹 Yeni proje oluştur
 */
export declare function create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
/**
 * 🔹 Mevcut projeyi güncelle
 */
export declare function update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
/**
 * 🔹 Projeyi sil
 */
export declare function remove(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=projects.controller.d.ts.map