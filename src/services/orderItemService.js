import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function addItemToOrder(orderId, product) {
    const { productId, productType, quantity } = product;

    let dbProduct;

    const type = productType.toLowerCase();
    if (type === "coffee")
        dbProduct = await prisma.coffee.findUnique({
            where: { id: productId },
        });
    else if (type === "food")
        dbProduct = await prisma.food.findUnique({ where: { id: productId } });
    else if (type === "drinks")
        dbProduct = await prisma.drinks.findUnique({
            where: { id: productId },
        });

    if (!dbProduct) {
        throw new Error("Product not found");
    }

    const price = dbProduct.price;

    let orderItem = await prisma.orderItens.findFirst({
        where: { orderId, productId, productType },
    });

    if (orderItem) {
        orderItem = await prisma.orderItens.update({
            where: { id: orderItem.id },
            data: { quantity: orderItem.quantity + quantity },
        });
    } else {
        orderItem = await prisma.orderItens.create({
            data: { orderId, productId, productType, quantity, price },
        });
    }

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { OrderItem: true },
    });
    const totalPrice = order.OrderItem.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    await prisma.order.update({ where: { id: orderId }, data: { totalPrice } });

    return orderItem;
}

async function removeOrderItem(orderId, product) {
    const { productId, productType, quantity = 1 } = product;

    const orderItem = await prisma.orderItens.findFirst({
        where: { orderId, productId, productType },
    });

    if (!orderItem) {
        throw new Error("Order item not found");
    }

    if (orderItem.quantity > quantity) {
        await prisma.orderItens.update({
            where: { id: orderId.id },
            data: { quantity: orderItem.quantity - quantity },
        });
    } else {
        // Remove o item completamente
        await prisma.orderItens.delete({ where: { id: orderItem.id } });
    }

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { OrderItem: true },
    });

    const totalPrice = order.OrderItem.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    await prisma.order.update({ where: { id: orderId }, data: { totalPrice } });

    return { message: "Item removed/updated successfully" };
}

const orderItemService = {
    addItemToOrder,
    removeOrderItem,
};

export default orderItemService;
