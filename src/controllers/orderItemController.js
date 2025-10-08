import orderItemService from "../services/orderItemService.js";

export async function addItem(req, res) {
    try {
        const orderId = Number(req.params.orderId);
        if (!orderId) {
            return res.status(404).json({ message: "Order not found" });
        }
        const product = req.body;
        const orderItem = await orderItemService.addItemToOrder(
            orderId,
            product
        );
        res.json(orderItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteItem(req, res) {
    const orderId = Number(req.params.orderId);
    if (!orderId) {
        return res.status(404).json({ message: "Order not found" });
    }
    const product = req.body;
    const result = await orderItemService.removeOrderItem(orderId, product);
    res.json(result);
}

const orderItemController = {
    addItem,
    deleteItem,
};

export default orderItemController;
