// Define rotas de usuários e conecta cada rota ao controller correspondente
import { Router } from "express";
const router = Router();
import userController from "../controllers/userController.js";

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.postUser);
router.put("/:id", userController.putUser);
router.delete("/:id", userController.deleteUser);
export default router;
