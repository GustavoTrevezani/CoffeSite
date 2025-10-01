import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getUsers() {
    return await prisma.user.findMany();
}

async function getUser(id) {
    return await prisma.user.findUnique({ where: { id } });
}

async function createUser(userData) {
    return await prisma.user.create({ data: userData });
}

async function updateUser(id, userData) {
    return await prisma.user.update({
        where: { id },
        data: userData,
    });
}

async function removeUser(id) {
    return await prisma.user.delete({ where: { id } });
}

const userService = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    removeUser,
};
export default userService;
