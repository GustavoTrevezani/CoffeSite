// Controlador de usuários: define funções para obter todos os usuários ou um usuário específico
import coffeeService from "../services/coffeeService.js";

async function getAllCoffees(req, res) {
    const coffees = await coffeeService.getCoffees();
    res.json(coffees);
}

async function getCoffeeById(req, res) {
    const id = Number(req.params.id);
    const existCoffee = await coffeeService.getCoffee(id);
    if (!existCoffee) {
        return res.status(404).json({ message: "coffee not found" });
    }
    res.json(existCoffee);
}

async function postCoffee(req, res) {
    const newCoffee = await coffeeService.createCoffee(req.body);
    res.status(201).json(newCoffee);
}

async function putCoffee(req, res) {
    const id = Number(req.params.id);
    const existCoffee = await coffeeService.getCoffee(id);
    if (!existCoffee) {
        return res.status(404).json({ message: "coffee not found" });
    }
    const updatedCoffee = await coffeeService.updateCoffee(id, req.body);
    res.status(200).json(updatedCoffee);
}

const coffeeController = {
    getAllCoffees,
    getCoffeeById,
    postCoffee,
    putCoffee,
};
export default coffeeController;
