import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
interface RequestWithUser extends Request {
    user?: string | JwtPayload;
}
export declare function requireAuth(req: RequestWithUser, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=auth.d.ts.map