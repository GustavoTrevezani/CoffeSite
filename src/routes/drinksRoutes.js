import { Router } from "express";
const router = Router();
import drinkController from "../controllers/drinksController.js";

router.get("/", drinkController.getAllDrinks);
router.get("/:id", drinkController.getDrinkById);
router.post("/", drinkController.postDrink);
router.put("/:id", drinkController.putDrink);
router.delete("/:id", drinkController.deleteDrink);
export default router;
