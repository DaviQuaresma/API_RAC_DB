import { Router } from "express";
import { getAll, create, update, remove } from "../controllers/databaseController.js";

const router = Router();

router.get("/database", getAll);
router.post("/database", create);
router.put("/database/:id", update);
router.delete("/database/:id", remove);

export default router;