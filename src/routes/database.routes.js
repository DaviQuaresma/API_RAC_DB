import { Router } from "express";
import { getAll, create, update, remove, getUniqueDatabase, active, getDatabaseActive } from "../controllers/databaseController.js";

const router = Router();

router.get("/database", getAll);
router.get("/database/:database", getUniqueDatabase);
router.get("/database/active/data", getDatabaseActive);
router.post("/database", create);
router.put("/database/:id", update);
router.delete("/database/:database", remove);
router.post("/database/active/:database", active);

export default router;
