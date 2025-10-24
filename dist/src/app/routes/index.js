"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const skills_routes_1 = __importDefault(require("./skills.routes"));
const projects_routes_1 = __importDefault(require("./projects.routes"));
const timeline_routes_1 = __importDefault(require("./timeline.routes"));
const certificate_routes_1 = __importDefault(require("./certificate.routes"));
const contact_routes_1 = __importDefault(require("./contact.routes"));
const visitor_routes_1 = __importDefault(require("./visitor.routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
const about_routes_1 = __importDefault(require("./about.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes")); // 🔥 EKLENDİ
const router = (0, express_1.Router)();
router.use("/skills", skills_routes_1.default);
router.use("/projects", projects_routes_1.default);
router.use("/timeline", timeline_routes_1.default);
router.use("/certificates", certificate_routes_1.default);
router.use("/contact", contact_routes_1.default);
router.use("/visitors", visitor_routes_1.default);
router.use("/dashboard", dashboard_routes_1.default);
router.use("/about", about_routes_1.default);
router.use("/auth", auth_routes_1.default); // 🔥 EKLENDİ
exports.default = router;
//# sourceMappingURL=index.js.map