"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadPath = path_1.default.join(__dirname, "../../public/uploads/certificates");
if (!fs_1.default.existsSync(uploadPath))
    fs_1.default.mkdirSync(uploadPath, { recursive: true });
const storage = multer_1.default.diskStorage({
    destination: (_, __, cb) => cb(null, uploadPath),
    filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
exports.upload = (0, multer_1.default)({ storage });
//# sourceMappingURL=uploader.js.map