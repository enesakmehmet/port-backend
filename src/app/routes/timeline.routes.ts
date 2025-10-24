// src/app/routes/timeline.routes.ts
import { Router } from "express";
import * as ctrl from "../controllers/timeline.controller";
import { requireAuth } from "../middlewares/auth";

const r = Router();

// 🎯 Timeline route'ları
r.get("/", ctrl.list);                    // herkese açık: timeline göster
r.post("/", requireAuth, ctrl.create);    // sadece admin ekleyebilir
r.put("/:id", requireAuth, ctrl.update);  // admin güncelleyebilir
r.delete("/:id", requireAuth, ctrl.remove); // admin silebilir

export default r;
