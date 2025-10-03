import drinksService from "../services/drinksService.js";

async function getAllDrinks(req, res) {
    const drink = await drinksService.getDrinks();
    res.json(drink);
}

async function getDrinkById(req, res) {
    const id = Number(req.params.id);
    const existDrink = await drinksService.getDrink(id);
    if (!existDrink) {
        return res.status(404).json({ message: "Drink not found" });
    }
    res.send(existDrink);
}

async function postDrink(req, res) {
    const newDrink = await drinksService.createDrink(req.body);
    res.status(202).json(newDrink);
}

async function putDrink(req, res) {
    const id = Number(req.params.id);
    const existDrinks = await drinksService.getDrink(id);
    if (!existDrinks) {
        res.status(404).json({ message: "Drink not Found" });
    }
    const updatedDrink = await drinksService.updateDrink(id, req.body);
    res.status(202).json(updatedDrink);
}

async function deleteDrink(req, res) {
    const id = Number(req.params.id);
    const existDrinks = await drinksService.getDrink(id, req.body);
    if (!existDrinks) {
        res.status(404).json({ message: "Drink not Found" });
    }
    const deleteDrink = await drinksService.removeDrink(id);
    res.status(404).json(deleteDrink);
}

const drinkController = {
    getAllDrinks,
    getDrinkById,
    postDrink,
    putDrink,
    deleteDrink,
};

export default drinkController;
