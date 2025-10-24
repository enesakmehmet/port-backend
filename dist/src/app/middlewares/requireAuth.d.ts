import { Request, Response, NextFunction } from "express";
/**
 * 🔐 JWT doğrulama middleware'i
 * Bu middleware, sadece giriş yapmış (token almış) adminlerin belirli route’lara erişmesini sağlar.
 */
export declare function requireAuth(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=requireAuth.d.ts.map