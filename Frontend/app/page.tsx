"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Header } from "@/components/header";
import { TabNavigation } from "@/components/tab-navigation";
import { ProductGrid } from "@/components/product-grid";
import { ProductModal } from "@/components/product-modal";
import { CoffeeCategory, Product } from "@/types/product";
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
    // const [products, setProducts] = useState<Coffee[]>([]);
    // const [loading, setLoading] = useState(true);

    const { data: products, isLoading } = useProducts(activeTab);

    // useEffect(() => {
    //     async function loadProducts() {
    //         setLoading(true);

    //         const table =
    //             activeTab === "Coffee"
    //                 ? "Coffee"
    //                 : activeTab === "Food"
    //                 ? "Food"
    //                 : "Drinks";

    //         const data = await getProducts(table);
    //         console.log("🔹 Produtos carregados:", data);
    //         setProducts(data);

    //         setLoading(false);
    //     }

    //     loadProducts();
    // }, [activeTab]);

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
                    products={(products ?? []).map((p) => ({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        description: p.description,
                        image: p.image_url,
                        category: p.category as CoffeeCategory,
                        size: p.size,
                        image_url: p.image_url,
                        ingredients: p.ingredients,
                        points: p.points,
                        available: p.available,
                    }))}
                    onProductClick={(product) => setSelectedProduct(product)}
                />
            </div>

            {selectedProduct && (
                <ProductModal
                    // product={{
                    //     id: selectedProduct.id,
                    //     name: selectedProduct.name,
                    //     price: selectedProduct.price,
                    //     description: selectedProduct.description,
                    //     image_url: selectedProduct.image_url,
                    //     category: selectedProduct.category as CoffeeCategory,
                    //     points: selectedProduct.points,
                    //     available: selectedProduct.available,
                    //     created_at: selectedProduct.created_at,
                    //     updated_at: selectedProduct.updated_at,
                    //     size: selectedProduct.size,
                    //     ingredients: selectedProduct.ingredients,
                    // }}
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </main>
    );
}
