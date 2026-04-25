import express from "express";
import * as taskController from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, taskController.getAll);
router.get("/:id", authMiddleware, taskController.getById);
router.post("/", authMiddleware, taskController.create);
router.put("/:id", authMiddleware, taskController.update);
router.delete("/:id", authMiddleware, taskController.remove);

export default router;
