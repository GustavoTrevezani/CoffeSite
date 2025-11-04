import { Router } from "express";
const router = Router();
import foodController from "../controllers/foodController.js";

router.get("/", foodController.getAllFood);
router.get("/:id", foodController.getFoodById);
router.post("/", foodController.postFood);
router.put("/:id", foodController.putFood);
router.delete("/:id", foodController.deleteFood);
export default router;
