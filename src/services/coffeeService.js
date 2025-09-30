// Serviço de usuários: funções que acessam o modelo para buscar dados
// import coffeeModel from "../models/coffeeModel.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCoffees() {
    return await prisma.coffee.findMany();
}

async function getCoffee(id) {
    return await prisma.coffee.findUnique(id);
}

async function createCoffee(coffeeData) {
    return await prisma.coffee.create({ data: coffeeData });
}

const coffeeService = { getCoffees, getCoffee, createCoffee };
export default coffeeService;
