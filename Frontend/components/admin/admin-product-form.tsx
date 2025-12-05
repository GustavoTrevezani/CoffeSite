"use client";

import type React from "react";
import { useState } from "react";
import type {
    Product,
    CoffeeProduct,
    FoodProduct,
    DrinksProduct,
    CoffeeCategory,
    MainCategory,
} from "@/types/product";

interface AdminProductFormProps {
    categoryType: MainCategory;
    initialProduct: Product | null;
    onSave: (product: Product) => void;
    onCancel: () => void;
}

export function AdminProductForm({
    categoryType,
    initialProduct,
    onSave,
    onCancel,
}: AdminProductFormProps) {
    const [formData, setFormData] = useState<any>({
        name: initialProduct?.name || "",
        price: initialProduct?.price || 0,
        description: initialProduct?.description || "",
        image: initialProduct?.image_url || "",
        points: initialProduct?.points || 0,
        ingredients: [],
        // Coffee specific
        ...(categoryType === "coffee" && {
            size: (initialProduct as CoffeeProduct)?.size || "300 ml",
            category: (initialProduct as CoffeeProduct)?.category || "Quente",
            ingredients: (initialProduct as CoffeeProduct)?.ingredients || "",
        }),
        // Food specific
        ...(categoryType === "food" && {
            category: (initialProduct as FoodProduct)?.category || "sweet",
            ingredients: (initialProduct as FoodProduct)?.ingredients || [],
            filling: (initialProduct as FoodProduct)?.filling || "",
        }),
        // Drinks specific
        ...(categoryType === "drinks" && {
            size: (initialProduct as DrinksProduct)?.size || "300 ml",
            category: (initialProduct as DrinksProduct)?.category || "water",
            ingredients: (initialProduct as DrinksProduct)?.ingredients || [],
        }),
    });

    const [ingredientInput, setIngredientInput] = useState("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target?.result as string;
                setFormData((prev: any) => ({ ...prev, image: base64 }));
            };
            reader.readAsDataURL(file);
        }
    };

    const addIngredient = () => {
        if (ingredientInput.trim()) {
            setFormData((prev: any) => ({
                ...prev,
                ingredients: [...prev.ingredients, ingredientInput.trim()],
            }));
            setIngredientInput("");
        }
    };

    const removeIngredient = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            ingredients: prev.ingredients.filter(
                (_: string, i: number) => i !== index
            ),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.description || formData.price <= 0) {
            alert("Preencha todos os campos obrigatórios corretamente");
            return;
        }

        let product: Product;

        if (categoryType === "coffee") {
            product = {
                id: initialProduct?.id ?? Date.now(),
                type: "coffee",
                name: formData.name,
                price: formData.price,
                description: formData.description,
                size: formData.size,
                category: formData.category,
                ingredients: formData.ingredients,
                points: formData.points,
                image_url:
                    formData.image_url ??
                    "/placeholder.svg?height=250&width=250",
                available: initialProduct?.available ?? true,
            } satisfies CoffeeProduct;
        } else if (categoryType === "food") {
            product = {
                id: initialProduct?.id || Date.now(),
                type: "food",
                name: formData.name,
                price: formData.price,
                description: formData.description,
                category: formData.category,
                ingredients: formData.ingredients,
                filling: formData.filling || undefined,
                points: formData.points,
                image_url:
                    formData.image ?? "/placeholder.svg?height=250&width=250",
                available: initialProduct?.available ?? true,
            } satisfies FoodProduct;
        } else {
            product = {
                id: initialProduct?.id ?? Date.now(),
                type: "drinks",
                name: formData.name,
                price: formData.price,
                description: formData.description,
                size: formData.size,
                category: formData.category,
                ingredients: formData.ingredients,
                points: formData.points,
                image_url:
                    formData.image_url ??
                    "/placeholder.svg?height=250&width=250",
                available: initialProduct?.available ?? true,
            } satisfies DrinksProduct;
        }

        onSave(product);
    };

    const inputClass =
        "w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-foreground placeholder-gray-400";
    const textareaClass =
        "w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-foreground resize-none placeholder-gray-400";

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border-2 border-amber-100 p-8 rounded-xl mb-6 space-y-6 shadow-sm"
        >
            <h3 className="text-xl font-bold text-foreground mb-4">
                {initialProduct ? "Editar Produto" : "Novo Produto"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">
                        Nome *
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        className={inputClass}
                        placeholder="Ex: Espresso Italiano"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">
                        Preço *
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                price: Number.parseFloat(e.target.value),
                            }))
                        }
                        className={inputClass}
                        placeholder="0.00"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                    Descrição *
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData((prev: any) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    className={textareaClass}
                    rows={3}
                    placeholder="Descrição do produto"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">
                        Pontos *
                    </label>
                    <input
                        type="number"
                        value={formData.points}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                points: Number.parseInt(e.target.value),
                            }))
                        }
                        className={inputClass}
                        placeholder="0"
                        required
                    />
                </div>
            </div>

            {categoryType === "coffee" && (
                <div>
                    <label className="block text-sm font-semibold mb-3 text-foreground">
                        Categoria *
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    category: "Quente",
                                }))
                            }
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                                formData.category === "hot"
                                    ? "bg-amber-600 text-white border-amber-600"
                                    : "bg-white border-amber-200 text-foreground hover:border-amber-400"
                            }`}
                        >
                            Quente
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    category: "Quente",
                                }))
                            }
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                                formData.category === "Gelado"
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white border-amber-200 text-foreground hover:border-amber-400"
                            }`}
                        >
                            Gelado
                        </button>
                    </div>
                </div>
            )}

            {categoryType === "food" && (
                <div>
                    <label className="block text-sm font-semibold mb-3 text-foreground">
                        Categoria *
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    category: "sweet",
                                }))
                            }
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                                formData.category === "sweet"
                                    ? "bg-pink-600 text-white border-pink-600"
                                    : "bg-white border-amber-200 text-foreground hover:border-amber-400"
                            }`}
                        >
                            Doce
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    category: "savory",
                                }))
                            }
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                                formData.category === "savory"
                                    ? "bg-orange-600 text-white border-orange-600"
                                    : "bg-white border-amber-200 text-foreground hover:border-amber-400"
                            }`}
                        >
                            Salgado
                        </button>
                    </div>
                </div>
            )}

            {categoryType === "food" && (
                <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">
                        Recheio (opcional)
                    </label>
                    <input
                        type="text"
                        value={formData.filling}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                filling: e.target.value,
                            }))
                        }
                        className={inputClass}
                        placeholder="Ex: Chocolate, Creme"
                    />
                </div>
            )}

            <div>
                <label className="block text-sm font-semibold mb-3 text-foreground">
                    Ingredientes {categoryType === "drinks" && "(opcional)"}
                </label>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={ingredientInput}
                        onChange={(e) => setIngredientInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addIngredient();
                            }
                        }}
                        className={inputClass}
                        placeholder="Digite um ingrediente e pressione Enter"
                    />
                    <button
                        type="button"
                        onClick={addIngredient}
                        className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold whitespace-nowrap"
                    >
                        Adicionar
                    </button>
                </div>
                {formData.ingredients && formData.ingredients.length > 0 && (
                    <div className="flex flex-wrap gap-2 bg-amber-50 p-4 rounded-lg border border-amber-200">
                        {formData.ingredients.map(
                            (ingredient: string, index: number) => (
                                <div
                                    key={index}
                                    className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm flex items-center gap-2 font-medium"
                                >
                                    {ingredient}
                                    <button
                                        type="button"
                                        onClick={() => removeIngredient(index)}
                                        className="text-amber-900 hover:font-bold font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>

            {(categoryType === "coffee" || categoryType === "drinks") && (
                <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">
                        Tamanho *
                    </label>
                    <input
                        type="text"
                        value={formData.size}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                size: e.target.value,
                            }))
                        }
                        className={inputClass}
                        placeholder="Ex: 300 ml, 150 ml, 500 ml"
                        required
                    />
                </div>
            )}

            {categoryType === "drinks" && (
                <div>
                    <label className="block text-sm font-semibold mb-3 text-foreground">
                        Categoria *
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    category: "water",
                                }))
                            }
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                                formData.category === "water"
                                    ? "bg-cyan-600 text-white border-cyan-600"
                                    : "bg-white border-amber-200 text-foreground hover:border-amber-400"
                            }`}
                        >
                            Água
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    category: "juice",
                                }))
                            }
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                                formData.category === "juice"
                                    ? "bg-orange-500 text-white border-orange-500"
                                    : "bg-white border-amber-200 text-foreground hover:border-amber-400"
                            }`}
                        >
                            Suco
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev: any) => ({
                                    ...prev,
                                    category: "soda",
                                }))
                            }
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                                formData.category === "soda"
                                    ? "bg-red-600 text-white border-red-600"
                                    : "bg-white border-amber-200 text-foreground hover:border-amber-400"
                            }`}
                        >
                            Refrigerante
                        </button>
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                    Imagem
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={inputClass}
                />
                {formData.image && (
                    <div className="mt-4 w-24 h-24 rounded-lg overflow-hidden border-2 border-amber-200">
                        <img
                            src={formData.image || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-amber-200">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 border-2 border-amber-300 rounded-lg hover:bg-amber-50 transition-colors font-semibold text-foreground"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                >
                    {initialProduct ? "Atualizar" : "Criar"}
                </button>
            </div>
        </form>
    );
}
