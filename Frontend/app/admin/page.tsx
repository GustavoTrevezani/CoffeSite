"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminCategorySection } from "@/components/admin/admin-category-section";
import { useAllProducts } from "@/hooks/useAllProducts";
import { useQueryClient } from "@tanstack/react-query";
import { CoffeeCategory, type Product } from "@/types/product";
export default function AdminPage() {
    const { data: products, isLoading } = useAllProducts();
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        const auth = localStorage.getItem("baristaAuth");
        if (!auth) router.push("/");
    }, [router]);

    // -------------------------
    // 🔥 CREATE PRODUCT (BACKEND)
    // -------------------------
    async function handleAddProduct(productData: Product) {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        try {
            const endpointMap = {
                coffee: "/coffee",
                food: "/food",
                drinks: "/drink",
            };

            const endpoint = endpointMap[productData.type];

            const { id, type, ingredients, ...rest } = productData;

            const ingredientsAsString = Array.isArray(ingredients)
                ? ingredients.join(", ")
                : ingredients;

            const dataForPrisma = {
                ...rest,
                ingredients: ingredientsAsString,
            };

            const res = await fetch(`${BASE_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataForPrisma), // ✔ AGORA VAI!
            });

            if (!res.ok) throw new Error("Erro ao criar produto");

            await res.json();

            queryClient.invalidateQueries({ queryKey: ["all-products"] });
        } catch (error) {
            console.error(error);
        }
    }

    // -------------------------
    // 🔥 DELETE PRODUCT (BACKEND)
    // -------------------------
    async function handleDeleteProduct(productId: number) {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        try {
            const res = await fetch(`${BASE_URL}/coffee/${productId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(
                    errorData?.message || "Erro ao deletar produto"
                );
            }

            queryClient.invalidateQueries({ queryKey: ["all-products"] });
        } catch (error) {
            console.error("Delete error:", error);
        }
    }

    if (isLoading || !products) return <div>Carregando...</div>;

    const coffeeProducts = products.filter((p) => p.type === "coffee");
    const foodProducts = products.filter((p) => p.type === "food");
    const drinkProducts = products.filter((p) => p.type === "drinks");

    return (
        <main className="min-h-screen bg-background">
            <AdminHeader />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">Painel do Barista</h1>

                <div className="space-y-8">
                    <AdminCategorySection
                        title="Cafés"
                        categoryType="coffee"
                        products={coffeeProducts}
                        onAddProduct={handleAddProduct}
                        onDeleteProduct={handleDeleteProduct}
                    />

                    <AdminCategorySection
                        title="Lanches"
                        categoryType="food"
                        products={foodProducts}
                        onAddProduct={handleAddProduct}
                        onDeleteProduct={handleDeleteProduct}
                    />

                    <AdminCategorySection
                        title="Bebidas"
                        categoryType="drinks"
                        products={drinkProducts}
                        onAddProduct={handleAddProduct}
                        onDeleteProduct={handleDeleteProduct}
                    />
                </div>
            </div>
        </main>
    );
}
