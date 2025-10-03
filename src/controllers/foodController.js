import foodService from "../services/foodService.js";

async function getAllFood(req, res) {
    const food = await foodService.getFoods();
    res.json(food);
}

async function getFoodById(req, res) {
    const id = Number(req.params.id);
    const existFoods = await foodService.getFood(id);
    if (!existFoods) {
        return res.status(404).json({ message: "Food not found" });
    }
    res.send(existFoods);
}

async function postFood(req, res) {
    const newFood = await foodService.createFood(req.body);
    res.status(202).json(newFood);
}

async function putFood(req, res) {
    const id = Number(req.params.id);
    const existFoods = await foodService.getFood(id);
    if (!existFoods) {
        res.status(404).json({ message: "Food not Found" });
    }
    const updatedFood = await foodService.updateFood(id, req.body);
    res.status(202).json(updatedFood);
}

async function deleteFood(req, res) {
    const id = Number(req.params.id);
    const existFoods = await foodService.getFood(id, req.body);
    if (!existFoods) {
        res.status(404).json({ message: "Food not Found" });
    }
    const deleteFood = await foodService.removeFood(id);
    res.status(404).json(deleteFood);
}

const foodController = {
    getAllFood,
    getFoodById,
    postFood,
    putFood,
    deleteFood,
};

export default foodController;
