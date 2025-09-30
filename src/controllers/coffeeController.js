// Controlador de usuários: define funções para obter todos os usuários ou um usuário específico
import coffeeService from "../services/coffeeService.js";

function getAllCoffees(req, res) {
    const coffees = coffeeService.getCoffees();
    res.json(coffees);
}

function getCoffeeById(req, res) {
    const Id = Number(req.params.id);
    const coffee = coffeeService.getCoffee(Id);
    if (!coffee) {
        return res.status(404).json({ message: "coffee not found" });
    }
    res.json(coffee);
}

const coffeeController = { getAllCoffees, getCoffeeById };
export default coffeeController;
