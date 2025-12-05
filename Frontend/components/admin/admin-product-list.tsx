"use client";

import type { Product } from "@/types/product";

interface AdminProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
}

export function AdminProductList({
    products,
    onEdit,
    onDelete,
}: AdminProductListProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                Nenhum item cadastrado nesta categoria
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="flex items-center justify-between bg-background p-4 rounded-lg border border-border hover:border-primary transition-colors"
                >
                    <div className="flex items-center gap-4 flex-1">
                        {product.image_url && (
                            <img
                                src={product.image_url || "/placeholder.svg"}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {product.description}
                            </p>
                            <p className="text-sm font-medium text-primary mt-1">
                                R$ {product.price.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(product)}
                            className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => {
                                if (
                                    confirm(
                                        "Tem certeza que deseja deletar este item?"
                                    )
                                ) {
                                    onDelete(product.id);
                                }
                            }}
                            className="px-3 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm font-medium"
                        >
                            Deletar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
