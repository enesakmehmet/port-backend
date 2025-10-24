import { Router } from "express";
import * as ctrl from "../controllers/projects.controller";
import { requireAuth } from "../middlewares/auth";

const r = Router();

// 🔹 Tüm projeler
r.get("/", ctrl.list);

// 🔹 Tek proje
r.get("/:id", ctrl.getById);

// 🔹 Yeni proje oluştur (admin)
r.post("/", requireAuth, ctrl.create);

// 🔹 Proje güncelle (admin)
r.put("/:id", requireAuth, ctrl.update);

// 🔹 Proje sil (admin)
r.delete("/:id", requireAuth, ctrl.remove);

export default r;
