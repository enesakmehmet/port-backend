import { Router } from "express";
import skillsRoutes from "./skills.routes";
import projectsRoutes from "./projects.routes";
import timelineRoutes from "./timeline.routes";
import certificateRoutes from "./certificate.routes";
import contactRoutes from "./contact.routes";
import visitorRoutes from "./visitor.routes";
import dashboardRoutes from "./dashboard.routes";
import aboutRoutes from "./about.routes";
import authRoutes from "./auth.routes"; // 🔥 EKLENDİ


const router = Router();

router.use("/skills", skillsRoutes);
router.use("/projects", projectsRoutes);
router.use("/timeline", timelineRoutes);
router.use("/certificates", certificateRoutes);
router.use("/contact", contactRoutes);
router.use("/visitors", visitorRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/about", aboutRoutes);
router.use("/auth", authRoutes); // 🔥 EKLENDİ

export default router;
