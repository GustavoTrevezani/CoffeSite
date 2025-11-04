import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getOrders() {
    return await prisma.order.findMany({
        include: {
            user: true,
            OrderItem: true,
        },
    });
}

async function getOrder(id) {
    return await prisma.order.findUnique({
        where: { id },
        include: {
            user: true,
            OrderItem: true,
        },
    });
}

async function createOrder(orderData) {
    const { userId, items } = orderData;

    if (!items || items.length == 0) {
        throw new Error("Order must contain at least one item");
    }

    let totalPrice = 0;
    const orderItemsData = [];

    for (const item of items) {
        const { productId, productType, quantity } = item;
        let product = null;

        const type = productType.toLowerCase();

        if (type === "coffee") {
            product = await prisma.coffee.findUnique({
                where: { id: productId },
            });
        } else if (type === "food") {
            product = await prisma.food.findUnique({
                where: { id: productId },
            });
        } else if (type === "drinks") {
            product = await prisma.drinks.findUnique({
                where: { id: productId },
            });
        }

        if (!product) {
            throw new Error(`Product not found: ${type} with id ${productId}`);
        }

        const price = product.price;
        const subtotal = price * quantity;
        totalPrice += subtotal;

        orderItemsData.push({
            productId,
            productType,
            quantity,
            price,
        });
    }

    const order = await prisma.order.create({
        data: {
            user: { connect: { id: userId } },
            totalPrice,
            status: "OPEN",
            payment: "PENDING",
            OrderItem: { create: orderItemsData },
        },
        include: {
            user: true,
            OrderItem: true,
        },
    });

    return order;
}

async function sendOrder(id) {
    const order = await prisma.order.findUnique({ where: { id: id } });
    if (!order) {
        throw new Error("Order not exist");
    }

    if (order.status !== "OPEN") {
        throw new Error("Only open orders can be sent!");
    }

    const emptyOrder = await prisma.orderItens.findMany({
        where: { orderId: id },
    });
    if (emptyOrder.length === 0) {
        throw new Error("Cannot send an empty order");
    }
    const sendedOrder = await prisma.order.update({
        where: { id },
        data: { status: "SENT" },
        include: { user: true, OrderItem: true },
    });

    return sendedOrder;
}

async function updateOrder(id, orderData) {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
        throw new Error("Order not exist");
    }
    const updatedOrder = await prisma.order.update({
        where: { id },
        data: orderData,
        include: { user: true, OrderItem: true },
    });

    return updatedOrder;
}

async function updateOrderStatus(orderId, newStatus) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
        throw new Error("Order not exist");
    }

    const validTransition = {
        OPEN: ["SENT", "CANCELED"],
        SENT: ["COMPLETED"],
    };

    const currentAllowed = validTransition[order.status] || [];
    if (!currentAllowed.includes(newStatus)) {
        throw new Error(
            `Cannot change order from ${order.status} to ${newStatus}`
        );
    }

    return prisma.order.update({
        where: { id: orderId },
        data: { status: newStatus },
    });
}

async function removeOrder(id) {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
        throw new Error("Order not exist");
    }

    await prisma.orderItens.deleteMany({ where: { orderId: id } });

    await prisma.order.delete({ where: { id } });

    return { message: "Order deleted successfully" };
}

const orderService = {
    getOrder,
    getOrders,
    createOrder,
    updateOrder,
    updateOrderStatus,
    removeOrder,
    sendOrder,
};

export default orderService;
