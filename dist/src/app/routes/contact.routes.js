"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("../controllers/contact.controller");
const router = express_1.default.Router();
// 📩 İletişim formundan mesaj gönderme
router.post("/", contact_controller_1.submit);
// 🧾 Admin panel için tüm mesajları listeleme
router.get("/", contact_controller_1.list);
// 🗑️ Admin panelden mesaj silme
router.delete("/:id", contact_controller_1.remove);
exports.default = router;
//# sourceMappingURL=contact.routes.js.map