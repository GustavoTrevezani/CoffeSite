// Serviço de usuários: funções que acessam o modelo para buscar dados
import coffeeModel from "../models/coffeeModel.js";

function getCoffees() {
    return coffeeModel.findAll();
}

function getCoffee(id) {
    return coffeeModel.findById(id);
}

const coffeeService = { getCoffees, getCoffee };
export default coffeeService;
