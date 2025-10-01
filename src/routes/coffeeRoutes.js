// Define rotas de usuários e conecta cada rota ao controller correspondente
import { Router } from "express";
const router = Router();
import coffeeController from "../controllers/coffeeController.js";

router.get("/", coffeeController.getAllCoffees);
router.get("/:id", coffeeController.getCoffeeById);
router.post("/", coffeeController.postCoffee);
router.put("/:id", coffeeController.putCoffee);
router.delete("/:id", coffeeController.deleteCoffee);
export default router;
