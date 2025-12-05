// src/types/product.ts

export type MainCategory = "coffee" | "food" | "drinks";

export enum CoffeeCategory {
    Quente = "Quente",
    Gelado = "Gelado",
}

// Base comum a todos os produtos
interface BaseProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    points: number;
    image_url: string;
    available: boolean;
    created_at?: string;
    updated_at?: string;
}

// Coffee
export interface CoffeeProduct extends BaseProduct {
    size: string;
    category: CoffeeCategory; // "Quente" | "Gelado"
    ingredients: string;
    type: "coffee";
}

// Food
export interface FoodProduct extends BaseProduct {
    category: string; // "sweet" | "savory"
    ingredients: string;
    filling?: string;
    type: "food";
}

// Drinks
export interface DrinksProduct extends BaseProduct {
    size: string;
    category: string; // "water", "soda", "juice"
    ingredients?: string;
    type: "drinks";
}

// Union de todos
export type Product = CoffeeProduct | FoodProduct | DrinksProduct;
