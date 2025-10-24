"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://enesakmehmet.com.tr",
    "https://www.enesakmehmet.com.tr",
    "https://portfolio-admin.vercel.app",
    "https://port-silk-nine.vercel.app",
];
const vercelRegex = /\.vercel\.app$/;
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin ||
            allowedOrigins.includes(origin) ||
            vercelRegex.test(origin)) {
            callback(null, true);
        }
        else {
            console.warn("🚫 CORS reddedildi:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
// ✅ Helmet güvenlik ayarları
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
}));
// ✅ JSON ve logger
app.use(express_1.default.json({ limit: "10mb" }));
app.use((0, morgan_1.default)("dev"));
// ✅ Statik dosyalar
const uploadDir = path_1.default.join(process.cwd(), "public", "uploads");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
    console.log("📂 'public/uploads' klasörü oluşturuldu.");
}
app.use("/public", express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.use("/uploads", express_1.default.static(uploadDir));
// ✅ Ana router
app.use("/api", routes_1.default);
// ✅ Sağlık kontrolü
app.get("/", (_, res) => res.send("✅ Portfolio Backend API is running!"));
exports.default = app;
//# sourceMappingURL=index.js.map