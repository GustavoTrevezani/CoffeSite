// Modelo de usuários: dados fictícios e funções de consulta
// NÃO UTILIZADO MAIS, SUBSTITUÍDO PELO PRISMA
const coffee = [
    {
        id: 1,
        name: "Cappuccino",
        price: 12,
        description: "Café expresso com leite vaporizado e espuma cremosa",
        size: "300ml",
        category: "Quente",
        ingredients: ["café expresso", "leite vaporizado", "espuma de leite"],
        image_url: "/images/cappuccino.jpg",
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 2,
        name: "Café Latte",
        price: 10,
        description: "Café expresso com mais leite e pouca espuma, sabor suave",
        size: "300ml",
        category: "Quente",
        ingredients: ["café expresso", "leite vaporizado"],
        image_url: "/images/cafe-latte.jpg",
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: 3,
        name: "Café Expresso",
        price: 8,
        description: "Café puro e intenso, servido em dose curta",
        size: "50ml",
        category: "Quente",
        ingredients: ["café expresso"],
        image_url: "/images/cafe-expresso.jpg",
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
];

function findAll() {
    return coffee;
}

function findById(id) {
    return coffee.find((coffee) => coffee.id === id);
}

function create(newCoffee) {
    if (
        !newCoffee.name ||
        !newCoffee.price ||
        !newCoffee.description ||
        !newCoffee.size ||
        !newCoffee.category
    ) {
        throw new Error("Nome e preço são obrigatórios");
    }
    const id = coffee.length ? coffee[coffee.length - 1].id + 1 : 1;
    const coffeeWithId = {
        id,
        ...newCoffee,
        created_at: new Date(),
        updated_at: new Date(),
    };
    coffee.push(coffeeWithId);
    return coffeeWithId;
}

function update(id, updatedCoffee) {
    const coffeeToUpdate = coffee.find((coffee) => coffee.id === id);
    if (!coffeeToUpdate) {
        throw new Error("Café não encontrado");
    }
}

const coffeeModel = { findAll, findById, create };
