"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Header } from "@/components/header";
import { TabNavigation } from "@/components/tab-navigation";
import { ProductGrid } from "@/components/product-grid";
import { ProductModal } from "@/components/product-modal";
import {
    CoffeeCategory,
    CoffeeProduct,
    DrinksProduct,
    FoodProduct,
    Product,
} from "@/types/product";
import { getProducts } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";

type Coffee = {
    id: number;
    name: string;
    price: number;
    description: string;
    size: string;
    category: string;
    points: number;
    ingredients: string;
    image_url: string;
    available: boolean;
};

export default function Home() {
    const [activeTab, setActiveTab] = useState<"Coffee" | "Food" | "Drinks">(
        "Coffee"
    );
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );
    const { data: products, isLoading } = useProducts(activeTab);
    if (isLoading)
        return <div className="text-center py-10">Carregando...</div>;

    console.log("Page tsx");
    console.log(products);
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <TabNavigation
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
                <ProductGrid
                    products={(products ?? []).map((p) => {
                        if (p.type === "coffee") {
                            return {
                                id: p.id,
                                name: p.name,
                                price: p.price,
                                description: p.description,
                                image_url: p.image_url,
                                category: p.category,
                                size: p.size, // obrigatório
                                ingredients: p.ingredients,
                                points: p.points,
                                available: p.available,
                                type: "coffee",
                            } satisfies CoffeeProduct;
                        }

                        if (p.type === "drinks") {
                            return {
                                id: p.id,
                                name: p.name,
                                price: p.price,
                                description: p.description,
                                image_url: p.image_url,
                                category: p.category,
                                size: p.size, // obrigatório
                                ingredients: p.ingredients,
                                points: p.points,
                                available: p.available,
                                type: "drinks",
                            } satisfies DrinksProduct;
                        }

                        return {
                            id: p.id,
                            name: p.name,
                            price: p.price,
                            description: p.description,
                            image_url: p.image_url,
                            category: p.category,
                            ingredients: p.ingredients,
                            points: p.points,
                            available: p.available,
                            type: "food",
                        } satisfies FoodProduct;
                    })}
                    onProductClick={(product) => setSelectedProduct(product)}
                />
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </main>
    );
}
