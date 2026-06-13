import express from "express";
import TodoCtrl from "../controllers/todo.controller";

const router = express.Router();

router.post("/", TodoCtrl.createTask);
router.get("/", TodoCtrl.getAll);
router.get("/:id", TodoCtrl.getById);
router.put("/:id", TodoCtrl.update);
router.delete("/:id", TodoCtrl.delete);

export default router;