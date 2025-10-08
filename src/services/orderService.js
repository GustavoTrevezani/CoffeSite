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
            price, // gravamos o preço atual do produto para histórico
        });
    }

    const order = await prisma.order.create({
        data: {
            user: { connect: { id: userId } },
            totalPrice,
            OrderItem: { create: orderItemsData },
        },
        include: {
            user: true,
            OrderItem: true,
        },
    });

    return order;
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
    removeOrder,
};

export default orderService;
