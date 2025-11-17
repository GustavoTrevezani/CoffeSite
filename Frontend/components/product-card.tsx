"use client";

import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    product: Product;
    onImageClick: () => void;
}

export function ProductCard({ product, onImageClick }: ProductCardProps) {
    return (
        <div
            onClick={onImageClick}
            className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
            <div className="w-full h-48 overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity">
                <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                    }}
                />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg mb-1 text-card-foreground">
                    {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-lg">
                        R$ {product.price.toFixed(2)}
                    </span>
                    <Button
                        size="sm"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                        Adicionar
                    </Button>
                </div>
            </div>
        </div>
    );
}
