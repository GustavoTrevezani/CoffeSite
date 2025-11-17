import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product";

export async function getProducts(
    table: "Coffee" | "Food" | "Drinks"
): Promise<Product[]> {
    const { data, error } = await supabase.from(table).select("*");

    if (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }

    return data as Product[];
}

// import type { Product } from "@/types/product";

// export const PRODUCTS: Product[] = [
//     // Cafés
//     {
//         id: "1",
//         name: "Espresso Italiano",
//         price: 8.9,
//         description: "Espresso clássico com corpo denso e crema dourada",
//         image: "/espresso-italiano-caf--premium.jpg",
//         category: "coffee",
//         details: [
//             "Grãos 100% arábica premium",
//             "Torra média",
//             "Aroma intenso",
//             "Corpo encorpado",
//         ],
//     },
//     {
//         id: "2",
//         name: "Cappuccino Cremoso",
//         price: 12.9,
//         description: "Cappuccino com leite vaporizado e espuma sedosa",
//         image: "/cappuccino-coffee-latte.jpg",
//         category: "coffee",
//         details: [
//             "Proporção perfeita 1:1:1",
//             "Leite integral fresco",
//             "Canela em pó",
//             "Temperatura ideal",
//         ],
//     },
//     {
//         id: "3",
//         name: "Café com Leite",
//         price: 7.5,
//         description: "Tradicional café coado com leite quente cremoso",
//         image: "/caf--com-leite-brasileiro-tradicional.jpg",
//         category: "coffee",
//         details: [
//             "Café coado artesanalmente",
//             "Leite integral aquecido",
//             "Suave e reconfortante",
//             "Clássico brasileiro",
//         ],
//     },
//     {
//         id: "4",
//         name: "Macchiato Marcante",
//         price: 10.9,
//         description: "Espresso marcado com um toque de leite vaporizado",
//         image: "/macchiato-espresso-cafe-marcado.jpg",
//         category: "coffee",
//         details: [
//             "Espresso duplo",
//             "Leite vaporizado na proporção certa",
//             "Aroma e sabor equilibrado",
//             "Para os apreciadores",
//         ],
//     },
//     {
//         id: "5",
//         name: "Cold Brew",
//         price: 14.9,
//         description: "Café gelado preparado por 24 horas com infusão fria",
//         image: "/cold-brew-iced-coffee.jpg",
//         category: "coffee",
//         details: [
//             "Infusão em água fria",
//             "Sabor suave e adocicado",
//             "Baixa acidez",
//             "Perfeito para dias quentes",
//         ],
//     },
//     {
//         id: "6",
//         name: "Café Filtrado Premium",
//         price: 9.9,
//         description: "Café coado com grãos selecionados recém moídos",
//         image: "/caf--filtrado-artesanal-qualidade.jpg",
//         category: "coffee",
//         details: [
//             "Moagem na hora",
//             "Grãos selecionados",
//             "Aroma completo",
//             "Sabor equilibrado",
//         ],
//     },

//     // Lanches
//     {
//         id: "7",
//         name: "Croissant de Chocolate",
//         price: 9.5,
//         description: "Croissant folhado com chocolate belga derretido",
//         image: "/croissant-chocolate-assado-lanche.jpg",
//         category: "food",
//         details: [
//             "Massa folhada caseira",
//             "Chocolate belga 70%",
//             "Quentinho do forno",
//             "Tradicional francês",
//         ],
//     },
//     {
//         id: "8",
//         name: "Pão de Queijo",
//         price: 6.9,
//         description: "Pão de queijo minas gerais saído do forno",
//         image: "/p-o-de-queijo-mineiro-quentinho.jpg",
//         category: "food",
//         details: [
//             "Feito na hora",
//             "Queijo meia cura",
//             "Crocante por fora",
//             "Macio por dentro",
//         ],
//     },
//     {
//         id: "9",
//         name: "Bolo de Cenoura",
//         price: 7.9,
//         description: "Bolo de cenoura com cobertura de chocolate derretido",
//         image: "/bolo-de-cenoura-com-cobertura-chocolate.jpg",
//         category: "food",
//         details: [
//             "Receita caseira",
//             "Cenoura fresca",
//             "Cobertura generosa",
//             "Úmido e saboroso",
//         ],
//     },
//     {
//         id: "10",
//         name: "Muffin de Blueberry",
//         price: 8.9,
//         description: "Muffin com blueberries frescas e cobertura crocante",
//         image: "/muffin-blueberry-fresco-doce.jpg",
//         category: "food",
//         details: [
//             "Blueberries frescas",
//             "Receita clássica americana",
//             "Cobertura crocante",
//             "Macio no interior",
//         ],
//     },
//     {
//         id: "11",
//         name: "Sandwich Natural",
//         price: 11.9,
//         description: "Sanduíche com peito de peru, queijo branco e vegetais",
//         image: "/sandwich-natural-alface-tomate-peito-peru.jpg",
//         category: "food",
//         details: [
//             "Pão integral fresco",
//             "Peito de peru premium",
//             "Vegetais frescos",
//             "Molho caseiro",
//         ],
//     },
//     {
//         id: "12",
//         name: "Tarte de Maçã",
//         price: 10.9,
//         description: "Tarte com maçã caramelizada e calda de caramelo",
//         image: "/tarte-tarte-de-ma---caramelizada.jpg",
//         category: "food",
//         details: [
//             "Massa folhada crocante",
//             "Maçã caramelizada",
//             "Calda de caramelo",
//             "Fresco do forno",
//         ],
//     },

//     // Bebidas
//     {
//         id: "13",
//         name: "Suco Natural de Laranja",
//         price: 8.5,
//         description: "Suco de laranja fresco espremido na hora",
//         image: "/suco-natural-laranja-fresco-vitamina.jpg",
//         category: "drinks",
//         details: [
//             "Laranjas selecionadas",
//             "Espremido na hora",
//             "100% natural",
//             "Sem açúcar adicionado",
//         ],
//     },
//     {
//         id: "14",
//         name: "Chai Latte",
//         price: 11.9,
//         description: "Bebida quente com chá chai, leite e especiarias",
//         image: "/chai-latte-especia-gengibre-canela.jpg",
//         category: "drinks",
//         details: [
//             "Chá chai premium",
//             "Leite vaporizado",
//             "Especiarias naturais",
//             "Aquecimento reconfortante",
//         ],
//     },
//     {
//         id: "15",
//         name: "Smoothie Detox",
//         price: 13.9,
//         description: "Smoothie com frutas vermelhas, espinafre e gengibre",
//         image: "/smoothie-detox-frutas-vermelhas-verde.jpg",
//         category: "drinks",
//         details: [
//             "Frutas vermelhas frescas",
//             "Espinafre orgânico",
//             "Gengibre fresco",
//             "Sem adição de açúcar",
//         ],
//     },
//     {
//         id: "16",
//         name: "Chocolate Quente Premium",
//         price: 10.9,
//         description: "Chocolate quente com chocolate belga e calda de caramelo",
//         image: "/chocolate-quente-premium-leite-quente.jpg",
//         category: "drinks",
//         details: [
//             "Chocolate belga 70%",
//             "Leite integral",
//             "Calda de caramelo",
//             "Marshmallow opcional",
//         ],
//     },
//     {
//         id: "17",
//         name: "Chá Gelado de Limão",
//         price: 7.9,
//         description: "Chá verde gelado com limão fresco e mel",
//         image: "/placeholder.svg?height=250&width=250",
//         category: "drinks",
//         details: [
//             "Chá verde natural",
//             "Limão fresco",
//             "Mel de abelha",
//             "Refrescante e leve",
//         ],
//     },
//     {
//         id: "18",
//         name: "Matcha Latte",
//         price: 12.9,
//         description: "Bebida preparada com pó matcha e leite vaporizado",
//         image: "/placeholder.svg?height=250&width=250",
//         category: "drinks",
//         details: [
//             "Matcha importado de qualidade",
//             "Leite integral fresco",
//             "Batido manualmente",
//             "Energia e bem-estar",
//         ],
//     },
// ];
