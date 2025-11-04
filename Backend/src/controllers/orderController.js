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

async function sendOrder(req, res) {
    const id = Number(req.params.id);
    if (!id) {
        return res.status(404).json({ message: "Order not found" });
    }

    const order = await orderService.getOrder(id);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    if (!order.OrderItem || order.OrderItem.length === 0) {
        return res.status(400).json({ message: "Order is empty" });
    }

    if (order.status !== "OPEN") {
        return res.status(400).json({ message: "Order must be OPEN to send" });
    }

    const sendedOrder = await orderService.sendOrder(id);
    res.status(200).json(sendedOrder);
}

async function putOrder(req, res) {
    const id = Number(req.params.id);
    if (!id) {
        res.status(404).json({ message: "Order not found" });
    }
    const dataOrder = req.body;
    const updatedOrder = await orderService.updateOrder(id, dataOrder);
    res.json(updatedOrder);
}

async function patchChangeOrderStatus(req, res) {
    const orderId = Number(req.params.id);
    const { status } = req.body;
    if (!orderId) {
        res.status(404).json({ message: "Order not found" });
    }

    const updateStatus = await orderService.updateOrderStatus(orderId, status);
    return res.json(updateStatus);
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
    sendOrder,
    putOrder,
    patchChangeOrderStatus,
    deleteOrder,
};

export default orderController;
