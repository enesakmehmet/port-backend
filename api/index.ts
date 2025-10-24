import app from "../src/app/index";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// ✅ Global CORS çözümü
export default function handler(req: VercelRequest, res: VercelResponse) {
  // --- CORS header'ları ekle ---
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Authorization, Content-Type"
  );

  // --- Preflight (OPTIONS) isteklerini burada sonlandır ---
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // --- Express app'i çalıştır ---
  return app(req, res);
}
