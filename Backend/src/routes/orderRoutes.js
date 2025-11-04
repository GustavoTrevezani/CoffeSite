import { Router } from "express";
const router = new Router();
import orderController from "../controllers/orderController.js";

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.postOrder);
router.patch("/:id/status", orderController.sendOrder);
router.put("/:id", orderController.putOrder);
router.patch("/:id/orderStatus", orderController.patchChangeOrderStatus);
router.delete("/:id", orderController.deleteOrder);
export default router;
