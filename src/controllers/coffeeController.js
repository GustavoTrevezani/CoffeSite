// Controlador de usuários: define funções para obter todos os usuários ou um usuário específico
import coffeeService from "../services/coffeeService.js";

async function getAllCoffees(req, res) {
    const coffees = await coffeeService.getCoffees();
    res.json(coffees);
}

async function getCoffeeById(req, res) {
    const Id = Number(req.params.id);
    const coffee = await coffeeService.getCoffee(Id);
    if (!coffee) {
        return res.status(404).json({ message: "coffee not found" });
    }
    res.json(coffee);
}

async function postCoffee(req, res) {
    const newCoffee = await coffeeService.createCoffee(req.body);
    res.status(201).json(newCoffee);
}

const coffeeController = { getAllCoffees, getCoffeeById, postCoffee };
export default coffeeController;
