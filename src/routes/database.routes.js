import { Router } from "express";
import { getAll, create, update, remove, getUniqueDatabase } from "../controllers/databaseController.js";

const router = Router();

router.get("/database", getAll);
router.get("/database/:database", getUniqueDatabase);
router.post("/database", create);
router.put("/database/:id", update);
router.delete("/database/:id", remove);

export default router;