import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";

import router from "./routes";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://enesakmehmet.com.tr",
  "https://www.enesakmehmet.com.tr",
  "https://admin.enesakmehmet.com.tr",
  "https://portfolio-admin.vercel.app",
  "https://port-silk-nine.vercel.app",
];
const vercelRegex = /\.vercel\.app$/;

// ✅ CORS - En başta olmalı
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        vercelRegex.test(origin)
      ) {
        callback(null, true);
      } else {
        console.warn("🚫 CORS reddedildi:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "X-Request-Id"],
    maxAge: 86400, // 24 saat
  })
);

// ✅ Helmet güvenlik ayarları - CORS'tan sonra
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// ✅ JSON ve logger
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

// ✅ Statik dosyalar
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📂 'public/uploads' klasörü oluşturuldu.");
}
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use("/uploads", express.static(uploadDir));

// ✅ Ana router
app.use("/api", router);

// ✅ Sağlık kontrolü
app.get("/", (_, res) => res.send("✅ Portfolio Backend API is running!"));

export default app;
