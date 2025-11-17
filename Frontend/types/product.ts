export type CoffeeCategory = "coffee" | "food" | "drinks";

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    size: string;
    category: CoffeeCategory;
    points: number;
    ingredients: string;
    image_url: string;
    available: boolean;
    created_at?: string;
    updated_at?: string;
}
