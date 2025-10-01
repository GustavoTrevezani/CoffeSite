// Controlador de usuários: define funções para obter todos os usuários ou um usuário específico
import userService from "../services/userService.js";

async function getAllUsers(req, res) {
    const users = await userService.getUsers();
    res.json(users);
}

async function getUserById(req, res) {
    const id = Number(req.params.id);
    const existUser = await userService.getUser(id);
    if (!existUser) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(existUser);
}

async function postUser(req, res) {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
}

async function putUser(req, res) {
    const id = Number(req.params.id);
    const existUser = await userService.getUser(id);
    if (!existUser) {
        return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await userService.updateUser(id, req.body);
    res.status(200).json(updatedUser);
}

async function deleteUser(req, res) {
    const id = Number(req.params.id);
    const existUser = await userService.getUser(id);
    if (!existUser) {
        return res.status(404).json({ message: "User not found" });
    }
    const removedUser = await userService.removeUser(id);
    res.status(200).json(removedUser);
}

const userController = {
    getAllUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,
};
export default userController;
