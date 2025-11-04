import express from "express";
const router = express.Router();
import orderItemController from "../controllers/orderItemController.js";

router.patch("/:orderId/add-item", orderItemController.addItem);
router.patch("/:orderId/remove-item", orderItemController.deleteItem);

export default router;
