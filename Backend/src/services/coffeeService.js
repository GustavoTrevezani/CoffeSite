// Serviço de usuários: funções que acessam o modelo para buscar dados
// import coffeeModel from "../models/coffeeModel.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCoffees() {
    return await prisma.coffee.findMany();
}

async function getCoffee(id) {
    return await prisma.coffee.findUnique({ where: { id } });
}

async function createCoffee(coffeeData) {
    return await prisma.coffee.create({ data: coffeeData });
}

async function updateCoffee(id, coffeeData) {
    return await prisma.coffee.update({
        where: { id },
        data: coffeeData,
    });
}

async function removeCoffee(id) {
    return await prisma.coffee.delete({ where: { id } });
}

const coffeeService = {
    getCoffees,
    getCoffee,
    createCoffee,
    updateCoffee,
    removeCoffee,
};
export default coffeeService;
