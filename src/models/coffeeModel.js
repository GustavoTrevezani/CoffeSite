// Modelo de usuários: dados fictícios e funções de consulta
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

const coffeeModel = { findAll, findById };

export default coffeeModel;
