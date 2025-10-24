import { Router } from "express";
import * as ctrl from "../controllers/skills.controller";
import { requireAuth } from "../middlewares/auth";

const r = Router();

// ✅ Tüm skill'leri listele (herkese açık)
r.get("/", ctrl.list);

// ✅ Yeni skill ekle (sadece admin)
r.post("/", requireAuth, ctrl.create);

// ✅ Skill güncelle (sadece admin)
r.put("/:id", requireAuth, ctrl.update);

// ✅ Skill sil (sadece admin)
r.delete("/:id", requireAuth, ctrl.remove);

export default r;
