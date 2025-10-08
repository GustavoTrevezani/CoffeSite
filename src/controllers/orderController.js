import orderService from "../services/orderService.js";

async function getAllOrders(req, res) {
    const orders = await orderService.getOrders();
    res.json(orders);
}

async function getOrderById(req, res) {
    const id = Number(req.params.id);
    const orderExist = await orderService.getOrder(id);
    if (!orderExist) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.json(orderExist);
}

async function postOrder(req, res) {
    const { userId, items } = req.body;

    if (!userId || !items) {
        return res.status(400).json({ message: "Missing userId ou Items" });
    }

    const newOrder = await orderService.createOrder({
        userId: Number(userId),
        items,
    });

    res.status(201).json(newOrder);
}

async function putOrder(req, res) {
    const id = Number(req.params.id);
    if (!id) {
        res.status(404).json({ message: "Order not found" });
    }
    const dataOrder = req.body;
    const updatedOrder = await orderService.updateOrder(id, dataOrder);
    res.jso(updatedOrder);
}

async function deleteOrder(req, res) {
    const id = Number(req.params.id);
    if (!id) {
        res.status(404).json({ message: "Order not found" });
    }
    const deletedOrder = await orderService.removeOrder(id);
    res.json(deletedOrder);
}

const orderController = {
    getAllOrders,
    getOrderById,
    postOrder,
    putOrder,
    deleteOrder,
};

export default orderController;
