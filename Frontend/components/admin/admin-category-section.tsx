"use client";

import { useState } from "react";
import { AdminProductForm } from "@/components/admin/admin-product-form";
import { AdminProductList } from "@/components/admin/admin-product-list";
import type { Product, CoffeeCategory, MainCategory } from "@/types/product";

interface AdminCategorySectionProps {
    title: string;
    categoryType: MainCategory;
    products: Product[];
    onAddProduct: (product: Product) => void;
    onDeleteProduct: (productId: number) => void;
}

export function AdminCategorySection({
    title,
    categoryType,
    products,
    onAddProduct,
    onDeleteProduct,
}: AdminCategorySectionProps) {
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleCreateNew = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleSave = (product: Product) => {
        onAddProduct(product);
        setShowForm(false);
        setEditingProduct(null);
    };

    return (
        <section className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <button
                    onClick={handleCreateNew}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                    + Criar novo item
                </button>
            </div>

            {showForm && (
                <AdminProductForm
                    categoryType="coffee"
                    initialProduct={editingProduct}
                    onSave={handleSave}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingProduct(null);
                    }}
                />
            )}

            <AdminProductList
                products={products}
                onEdit={handleEdit}
                onDelete={onDeleteProduct}
            />
        </section>
    );
}
