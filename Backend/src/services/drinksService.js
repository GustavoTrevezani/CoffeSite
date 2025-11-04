import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getDrinks() {
    return await prisma.drinks.findMany();
}

async function getDrink(id) {
    return await prisma.drinks.findUnique({ where: { id } });
}

async function createDrink(userData) {
    return await prisma.drinks.create({ data: userData });
}

async function updateDrink(id, userData) {
    return await prisma.drinks.update({
        where: { id },
        data: userData,
    });
}

async function removeDrink(id) {
    return await prisma.drinks.delete({ where: { id } });
}

const drinksService = {
    getDrinks,
    getDrink,
    createDrink,
    updateDrink,
    removeDrink,
};
export default drinksService;
