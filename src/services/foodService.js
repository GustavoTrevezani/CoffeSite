import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getFoods() {
    return await prisma.food.findMany();
}

async function getFood(id) {
    return await prisma.food.findUnique({ where: { id } });
}

async function createFood(foodData) {
    return await prisma.food.create({ data: foodData });
}

async function updateFood(id, foodData) {
    return await prisma.food.update({
        where: { id },
        data: foodData,
    });
}

async function removeFood(id) {
    return await prisma.food.delete({ where: { id } });
}

const foodService = { getFoods, getFood, createFood, updateFood, removeFood };

export default foodService;
